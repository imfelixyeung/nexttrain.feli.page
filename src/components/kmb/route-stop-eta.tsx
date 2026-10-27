"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { kmbQueries } from "@/api/bus/kmb/queries";
import type { Route } from "@/api/bus/kmb/schemas/route";
import type { RouteStop } from "@/api/bus/kmb/schemas/route-stop";
import { LocalisedString } from "@/i18n/utils";
import DistanceToNow from "../distance-to-now";

const KMBRouteStopETA = ({
    route,
    routeStop,
}: {
    route: Route;
    routeStop: RouteStop;
}) => {
    const { data } = useQuery(
        kmbQueries.eta({
            stop: routeStop.stop,
            route: route.route,
            serviceType: route.serviceType,
        }),
    );

    const filteredData = useMemo(() => {
        if (!data) return null;

        return data.data.filter(
            (d) =>
                d.dir === route.bound && d.service_type === route.serviceType,
        );
    }, [data, route]);

    if (!data || !filteredData) return null;

    return (
        <div key={data.generated_timestamp}>
            {filteredData.map(({ eta, eta_seq, remark }) => (
                <div key={eta_seq}>
                    {eta ? <DistanceToNow time={eta} /> : "-"}

                    {remark && (
                        <>
                            {" "}
                            (<LocalisedString string={remark} />)
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default KMBRouteStopETA;
