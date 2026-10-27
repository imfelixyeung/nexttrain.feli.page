"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@tanstack/react-query";
import type { FeatureCollection } from "geojson";
import { LngLat, LngLatBounds, setWorkerUrl } from "maplibre-gl";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { type ReactNode, useEffect, useMemo, useRef } from "react";
import MapGL, { Layer, type MapRef, Source } from "react-map-gl/maplibre";
import { kmbQueries } from "@/api/bus/kmb/queries";
import Hero from "@/components/hero";
import { KMBRoute } from "@/components/kmb/route";

setWorkerUrl(
    new URL(
        "maplibre-gl/dist/maplibre-gl-worker.mjs",
        import.meta.url,
    ).toString(),
);

export const LayoutClient = ({ children }: { children: ReactNode }) => {
    const mapRef = useRef<MapRef>(null);
    const t = useTranslations();

    const { route, bound, serviceType, stop } =
        useParams<
            Awaited<
                PageProps<"/[lang]/bus/kmb/routes/[route]/bound/[bound]/service-type/[serviceType]/stops/[stop]">["params"]
            >
        >();

    const { data: routes } = useQuery(kmbQueries.routes());
    const { data: routeStops } = useQuery(
        kmbQueries.routeStops({ route, direction: bound, serviceType }),
    );
    const { data: stops } = useQuery(kmbQueries.stops());
    const { data: routeLine } = useQuery(kmbQueries.routeLine({ route }));

    const routeStopsWithStopData = useMemo(() => {
        if (!routeStops || !stops) return [];
        return (
            routeStops?.data
                .map((rs) => ({
                    ...rs,
                    stop: stops.data.find((s) => s.stop === rs.stop) ?? null,
                }))
                .filter((rs) => rs.stop !== null) ?? []
        );
    }, [routeStops, stops]);
    const currentStop = useMemo(
        () => routeStopsWithStopData.find((rs) => rs.stop?.stop === stop),
        [stop, routeStopsWithStopData],
    );
    const bounds = useMemo(() => {
        const first = routeStopsWithStopData.find((rs) => rs.stop);
        if (!first?.stop) return null;
        return routeStopsWithStopData.reduce(
            (bounds, { stop }) => {
                if (!stop) return bounds;
                return bounds.extend(new LngLat(stop.longitude, stop.latitude));
            },
            new LngLatBounds(
                new LngLat(first.stop.longitude, first.stop.latitude),
            ),
        );
    }, [routeStopsWithStopData]);

    useEffect(() => {
        if (currentStop?.stop) {
            mapRef.current?.flyTo({
                center: new LngLat(
                    currentStop.stop.longitude,
                    currentStop.stop.latitude,
                ),
                zoom: 14,
            });
            return;
        }
        if (!bounds) return;
        mapRef.current?.fitBounds(bounds, { padding: 16 });
    }, [bounds, currentStop]);

    if (!routes || !routeStops || !stops) return t("common.loading");

    const routeData = routes.data.find(
        (r) =>
            r.route === route &&
            r.bound === bound &&
            r.serviceType === serviceType,
    );

    if (!routeData) return t("error.unknown");

    return (
        <>
            <Hero
                title={
                    <h1>
                        <KMBRoute route={routeData} />
                    </h1>
                }
            />
            <MapGL
                ref={mapRef}
                initialViewState={
                    currentStop?.stop
                        ? {
                              longitude: currentStop.stop.longitude,
                              latitude: currentStop.stop.latitude,
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
                {routeLine && (
                    <Source
                        id="route-line"
                        type="geojson"
                        data={routeLine satisfies FeatureCollection}
                    >
                        <Layer
                            id="route-line"
                            type="line"
                            source="route-line"
                            paint={{
                                "line-color": "red",
                                "line-width": 2,
                            }}
                        />
                    </Source>
                )}
                <Source
                    id="stops"
                    type="geojson"
                    data={
                        {
                            type: "FeatureCollection",
                            features: routeStopsWithStopData.map(
                                ({ stop }) => ({
                                    type: "Feature",
                                    geometry: {
                                        type: "Point",
                                        coordinates: [
                                            stop?.longitude ?? 0,
                                            stop?.latitude ?? 0,
                                        ],
                                    },
                                    properties: stop,
                                }),
                            ),
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
            </MapGL>
            {children}
        </>
    );
};
