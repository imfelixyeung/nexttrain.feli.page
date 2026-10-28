"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@tanstack/react-query";
import type { FeatureCollection } from "geojson";
import { LngLat, LngLatBounds, setWorkerUrl } from "maplibre-gl";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import MapGL, {
    GeolocateControl,
    Layer,
    type MapRef,
    Source,
} from "react-map-gl/maplibre";
import { mtrQueries } from "@/api/bus/mtr/queries";
import Hero from "@/components/hero";
import { MTRBusRoute } from "@/components/mtr/bus/route";

setWorkerUrl(
    new URL(
        "maplibre-gl/dist/maplibre-gl-worker.mjs",
        import.meta.url,
    ).toString(),
);

export const LayoutClient = ({ children }: { children: ReactNode }) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapRef = useRef<MapRef>(null);
    const t = useTranslations();

    const { route, ref, stop } =
        useParams<
            Awaited<
                PageProps<"/[lang]/bus/mtr/routes/[route]/ref/[ref]/stops/[stop]">["params"]
            >
        >();

    const locale = useLocale();
    const { data: rawETA } = useQuery(
        mtrQueries.eta({
            locale,
            route,
        }),
    );
    const { data: rawRoutes } = useQuery(mtrQueries.routes());
    const { data: rawStops } = useQuery(mtrQueries.stops());

    const routeData = useMemo(
        () => rawRoutes?.find((r) => r.id === route && r.ref === ref) ?? null,
        [rawRoutes, route, ref],
    );
    const stops = useMemo(
        () => rawStops?.filter((rs) => rs.route === route) ?? [],
        [rawStops, route],
    );
    const currentStop = useMemo(
        () => stops.find((rs) => rs.id === stop),
        [stops, stop],
    );

    const bounds = useMemo(() => {
        const first = stops[0];
        if (!first) return null;
        return stops.reduce(
            (bounds, { longitude, latitude }) => {
                return bounds.extend(new LngLat(longitude, latitude));
            },
            new LngLatBounds(new LngLat(first.longitude, first.latitude)),
        );
    }, [stops]);

    const busLocations = useMemo(
        () =>
            rawETA?.busStop.flatMap((stop) =>
                stop.bus.map((bus) => [
                    bus.busLocation.longitude,
                    bus.busLocation.latitude,
                ]),
            ) ?? [],
        [rawETA],
    );

    useEffect(() => {
        if (!mapLoaded) return;
        if (currentStop) {
            mapRef.current?.flyTo({
                center: new LngLat(currentStop.longitude, currentStop.latitude),
                zoom: 15,
            });
            return;
        }
        if (!bounds) return;
        mapRef.current?.fitBounds(bounds, { padding: 16 });
    }, [bounds, currentStop, mapLoaded]);

    if (!rawRoutes || !stops.length || !rawStops) return t("common.loading");

    if (!routeData) return t("error.unknown");

    return (
        <>
            <Hero
                title={
                    <h1>
                        <MTRBusRoute route={routeData} />
                    </h1>
                }
            />
            <MapGL
                onLoad={() => setMapLoaded(true)}
                ref={mapRef}
                initialViewState={
                    currentStop
                        ? {
                              longitude: currentStop.longitude,
                              latitude: currentStop.latitude,
                              zoom: 15,
                          }
                        : {
                              longitude: 114.177216,
                              latitude: 22.302711,
                              zoom: 8,
                          }
                }
                style={{ width: "100%", height: 300 }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
            >
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation
                />
                <Source
                    id="stops"
                    type="geojson"
                    data={
                        {
                            type: "FeatureCollection",
                            features: stops.map((stop) => ({
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [
                                        stop?.longitude ?? 0,
                                        stop?.latitude ?? 0,
                                    ],
                                },
                                properties: stop,
                            })),
                        } satisfies FeatureCollection
                    }
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
                <Source
                    id="busses"
                    type="geojson"
                    data={
                        {
                            type: "FeatureCollection",
                            features: busLocations.map((bus) => ({
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: bus,
                                },
                                properties: bus,
                            })),
                        } satisfies FeatureCollection
                    }
                >
                    <Layer
                        id="busses"
                        type="circle"
                        source="busses"
                        paint={{
                            "circle-color": "white",
                            "circle-radius": 3,
                            "circle-stroke-width": 2,
                            "circle-stroke-color": "black",
                        }}
                    />
                </Source>
            </MapGL>
            {children}
        </>
    );
};
