"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getRouteStopsByRoute, getRoutes, getStops } from "@/api/bus/kmb";
import Content from "@/components/content";
import Hero from "@/components/hero";
import { KMBRoute } from "@/components/kmb/route";
import { KMBRouteStops } from "@/components/kmb/route-stops";

export const PageClient = () => {
    const t = useTranslations();
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
    const { data: routeStops, ...rest } = useQuery({
        queryKey: ["getRouteStopsByRoute", route, bound, serviceType],
        queryFn: () =>
            getRouteStopsByRoute({ route, direction: bound, serviceType }),
    });
    const { data: stops } = useQuery({
        queryKey: ["getStops"],
        queryFn: getStops,
    });

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
