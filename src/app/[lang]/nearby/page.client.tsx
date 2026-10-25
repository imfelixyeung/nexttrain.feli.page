"use client";

import type { FeatureCollection } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useGeolocation } from "@uidotdev/usehooks";
import { LocateFixedIcon } from "lucide-react";
import { setWorkerUrl } from "maplibre-gl";
import { useLocale } from "next-intl";
import { useEffect, useMemo, useRef } from "react";
import MapGL, {
    Layer,
    type MapRef,
    Marker,
    Source,
} from "react-map-gl/maplibre";
import type { StopList } from "@/api/kmb/schemas/stop";
import { sortDistances } from "@/utils/coordinates";

setWorkerUrl(
    new URL(
        "maplibre-gl/dist/maplibre-gl-worker.mjs",
        import.meta.url,
    ).toString(),
);

export const NearbyBusStops = ({ stops }: { stops: StopList }) => {
    const locale = useLocale();
    const formatter = useMemo(
        () => ({
            m: new Intl.NumberFormat(locale, {
                style: "unit",
                unit: "meter",
                unitDisplay: "short",
                maximumFractionDigits: 0,
            }),
            km: new Intl.NumberFormat(locale, {
                style: "unit",
                unit: "kilometer",
                unitDisplay: "short",
                maximumFractionDigits: 2,
            }),
        }),
        [locale],
    );
    const state = useGeolocation({ enableHighAccuracy: true });
    const mapRef = useRef<MapRef>(null);

    const target = useMemo(() => {
        const { loading, error, longitude, latitude } = state;
        if (loading) return null;
        if (error) return null;
        if (longitude === null || latitude === null) return null;
        return { longitude, latitude };
    }, [state]);

    const nearbyStops = useMemo(() => {
        if (target === null) return null;
        return sortDistances(target, stops.data).slice(0, 50);
    }, [stops, target]);

    useEffect(() => {
        if (!target) return;
        mapRef.current?.flyTo({
            center: { lat: target.latitude, lon: target.longitude },
            zoom: 14,
        });
    }, [target]);

    return (
        <>
            <MapGL
                ref={mapRef}
                initialViewState={{
                    longitude: 114.177216,
                    latitude: 22.302711,
                    zoom: 9,
                }}
                style={{ width: "100%", height: 400 }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
            >
                {target && (
                    <Marker
                        longitude={target.longitude}
                        latitude={target.latitude}
                        anchor="center"
                    >
                        <LocateFixedIcon size={14} className="text-black" />
                    </Marker>
                )}
                <Source
                    id="clustered-stops"
                    type="geojson"
                    data={
                        {
                            type: "FeatureCollection",
                            features: stops.data.map((stop) => ({
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [
                                        stop.longitude,
                                        stop.latitude,
                                    ],
                                },
                                properties: stop,
                            })),
                        } satisfies FeatureCollection
                    }
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                >
                    <Layer
                        id="stops"
                        type="circle"
                        source="stops"
                        paint={{
                            "circle-color": "#ED1D24",
                            "circle-radius": 4,
                            "circle-stroke-width": 1,
                            "circle-stroke-color": "#fff",
                        }}
                    />
                </Source>
            </MapGL>
            <div>
                {nearbyStops?.map(({ stop, name, distance }) => (
                    <div
                        key={stop}
                        className="max-w-sm flex gap-3 justify-between"
                    >
                        <p>{name["en-HK"]}</p>
                        <p>
                            {distance < 1_000
                                ? formatter.m.format(distance)
                                : formatter.km.format(distance / 1_000)}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};
