"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { mtrQueries } from "@/api/bus/mtr/queries";
import type { Route } from "@/api/bus/mtr/schemas/route";
import type { Stop } from "@/api/bus/mtr/schemas/stop";

const MTRBusRouteStopETA = ({ route, stop }: { route: Route; stop: Stop }) => {
    const locale = useLocale();
    const { data } = useQuery(
        mtrQueries.eta({
            locale,
            route: route.id,
        }),
    );

    const stopData = useMemo(() => {
        if (!data) return null;

        return data.busStop.find((d) => d.busStopId === stop.id);
    }, [data, stop.id]);

    if (!data || !stopData) return null;

    return (
        <div>
            {stopData.bus.map(({ busRemark, arrivalTimeText }, index) => (
                <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: FIXME
                    key={index}
                >
                    {arrivalTimeText}
                    {busRemark && <> ({busRemark})</>}
                </div>
            ))}
        </div>
    );
};

export default MTRBusRouteStopETA;
