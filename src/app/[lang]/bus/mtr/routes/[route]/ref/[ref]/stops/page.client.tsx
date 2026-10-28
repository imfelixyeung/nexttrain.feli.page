"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { mtrQueries } from "@/api/bus/mtr/queries";
import Content from "@/components/content";
import { MTRBusRouteStops } from "@/components/mtr/bus/route-stops";

export const ClientPage = () => {
    const t = useTranslations();

    const { route, ref } =
        useParams<
            Awaited<
                PageProps<"/[lang]/bus/mtr/routes/[route]/ref/[ref]/stops">["params"]
            >
        >();

    const { data: rawRoutes } = useQuery(mtrQueries.routes());
    const { data: rawStops } = useQuery(mtrQueries.stops());

    const routeData = useMemo(
        () => rawRoutes?.find((r) => r.id === route && r.ref === ref) ?? null,
        [rawRoutes, route, ref],
    );
    const stops = useMemo(
        () =>
            rawStops?.filter((rs) => rs.route === route && rs.ref === ref) ??
            [],
        [rawStops, ref, route],
    );

    if (!routeData || !stops.length) return t("common.loading");

    if (!routeData) return t("error.unknown");

    return (
        <Content>
            <MTRBusRouteStops route={routeData} stops={stops} />
        </Content>
    );
};
