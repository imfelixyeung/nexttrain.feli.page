"use client";

import { cn } from "@heroui/styles";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import type { Route } from "@/api/bus/kmb/schemas/route";
import type { RouteStop } from "@/api/bus/kmb/schemas/route-stop";
import type { Stop } from "@/api/bus/kmb/schemas/stop";
import KMBRouteStopETA from "./route-stop-eta";
import KMBStop from "./stop";

export const KMBRouteStops = ({
    route,
    routeStops,
    stops,
}: {
    route: Route;
    routeStops: RouteStop[];
    stops: Stop[];
}) => {
    const { stop } = useParams<{ stop: string }>();

    const currentStopIndex = useMemo(() => {
        const routeStop = routeStops.find((rs) => rs.stop === stop);
        if (!routeStop) return -1;
        return routeStops.indexOf(routeStop);
    }, [routeStops, stop]);

    return (
        <ul className="grid grid-cols-[auto_1fr]">
            {routeStops.map((routeStop, index, routeStops) => {
                const stop = stops.find((s) => s.stop === routeStop.stop);
                if (!stop) return <Fragment key={routeStop.seq} />;

                const firstStop = index === 0;
                const lastStop = routeStops.length - 1 === index;
                const currentStop = currentStopIndex === index;
                const pastStop = index < currentStopIndex;

                return (
                    <li
                        key={routeStop.seq}
                        className="col-span-2 grid grid-cols-subgrid gap-3"
                    >
                        <div
                            className={cn(
                                "h-full w-4 bg-red-600",
                                firstStop && "rounded-t-full",
                                lastStop && "rounded-b-full",
                            )}
                        >
                            <div
                                className={cn(
                                    "mx-auto my-2 size-2.5 rounded-full bg-white",
                                    pastStop && "opacity-50",
                                )}
                            ></div>
                        </div>
                        <div className={cn(!lastStop && "pb-3")}>
                            <span className={cn(currentStop && "font-bold")}>
                                {index + 1}.{" "}
                                <KMBStop route={route} stop={stop} />
                            </span>
                            {currentStop && (
                                <div className="ml-3 border-l pl-3">
                                    <KMBRouteStopETA
                                        route={route}
                                        routeStop={routeStop}
                                    />
                                </div>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
