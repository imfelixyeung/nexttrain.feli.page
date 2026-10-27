"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@tanstack/react-query";
import type { FeatureCollection } from "geojson";
import { LngLat, LngLatBounds, setWorkerUrl } from "maplibre-gl";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef } from "react";
import MapGL, { Layer, type MapRef, Source } from "react-map-gl/maplibre";
import { getRouteStopsByRoute, getRoutes, getStops } from "@/api/bus/kmb";
import Content from "@/components/content";
import Hero from "@/components/hero";
import { KMBRoute } from "@/components/kmb/route";
import { KMBRouteStops } from "@/components/kmb/route-stops";

setWorkerUrl(
    new URL(
        "maplibre-gl/dist/maplibre-gl-worker.mjs",
        import.meta.url,
    ).toString(),
);

export const PageClient = () => {
    const mapRef = useRef<MapRef>(null);
    const t = useTranslations();
    const { stop } = useParams<{ stop?: string }>();

    const { route, bound, serviceType } =
        useParams<
            Awaited<
                PageProps<"/[lang]/bus/kmb/routes/[route]/bound/[bound]/service-type/[serviceType]/stops">["params"]
            >
        >();

    const { data: routes } = useQuery({
        queryKey: ["getRoutes"],
        queryFn: getRoutes,
    });
    const { data: routeStops } = useQuery({
        queryKey: ["getRouteStopsByRoute", route, bound, serviceType],
        queryFn: () =>
            getRouteStopsByRoute({ route, direction: bound, serviceType }),
    });
    const { data: stops } = useQuery({
        queryKey: ["getStops"],
        queryFn: getStops,
    });

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
        if (currentStop) return;
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
                style={{ width: "100%", height: 200 }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
            >
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
            <Content>
                <KMBRouteStops
                    route={routeData}
                    routeStops={routeStops.data}
                    stops={stops.data}
                />
            </Content>
        </>
    );
};
