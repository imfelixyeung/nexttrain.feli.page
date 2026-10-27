"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { getETA } from "@/api/bus/kmb";
import type { Route } from "@/api/bus/kmb/schemas/route";
import type { RouteStop } from "@/api/bus/kmb/schemas/route-stop";
import { LocalisedString } from "@/i18n/utils";

const KMBRouteStopETA = ({
    route,
    routeStop,
}: {
    route: Route;
    routeStop: RouteStop;
}) => {
    const { data } = useQuery({
        queryKey: [
            {
                stop: routeStop.stop,
                route: route.route,
                serviceType: route.serviceType,
            },
        ],
        queryFn: () =>
            getETA({
                stop: routeStop.stop,
                route: route.route,
                serviceType: route.serviceType,
            }),
        refetchInterval: 10_000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
    });

    if (!data) return null;

    return (
        <div key={data.generated_timestamp}>
            {data.data.map(({ eta, eta_seq, remark }) => (
                <div key={eta_seq}>
                    {eta ? formatDistanceToNow(eta) : "-"}
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
