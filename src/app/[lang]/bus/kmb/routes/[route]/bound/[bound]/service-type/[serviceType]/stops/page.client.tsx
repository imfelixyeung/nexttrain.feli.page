"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { kmbQueries } from "@/api/bus/kmb/queries";
import Content from "@/components/content";
import { KMBRouteStops } from "@/components/kmb/route-stops";

export const PageClient = () => {
    const t = useTranslations();

    const { route, bound, serviceType } =
        useParams<
            Awaited<
                PageProps<"/[lang]/bus/kmb/routes/[route]/bound/[bound]/service-type/[serviceType]/stops">["params"]
            >
        >();

    const { data: routes } = useQuery(kmbQueries.routes());
    const { data: routeStops } = useQuery(
        kmbQueries.routeStops({ route, direction: bound, serviceType }),
    );
    const { data: stops } = useQuery(kmbQueries.stops());

    if (!routes || !routeStops || !stops) return t("common.loading");

    const routeData = routes.data.find(
        (r) =>
            r.route === route &&
            r.bound === bound &&
            r.serviceType === serviceType,
    );

    if (!routeData) return t("error.unknown");

    return (
        <Content>
            <KMBRouteStops
                route={routeData}
                routeStops={routeStops.data}
                stops={stops.data}
            />
        </Content>
    );
};
