"use client";

import { cn } from "@heroui/styles";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import type { Route } from "@/api/bus/mtr/schemas/route";
import type { Stop } from "@/api/bus/mtr/schemas/stop";
import MTRBusRouteStopETA from "./route-stop-eta";
import MTRBusStop from "./stop";

export const MTRBusRouteStops = ({
    route,
    stops,
}: {
    route: Route;
    stops: Stop[];
}) => {
    const { stop } =
        useParams<
            Awaited<
                PageProps<"/[lang]/bus/mtr/routes/[route]/ref/[ref]/stops/[stop]">["params"]
            >
        >();

    const currentStopIndex = useMemo(() => {
        const routeStop = stops.find((rs) => rs.id === stop);
        if (!routeStop) return -1;
        return stops.indexOf(routeStop);
    }, [stops, stop]);

    return (
        <ul className="grid grid-cols-[auto_1fr]">
            {stops.map((routeStop, index, routeStops) => {
                const firstStop = index === 0;
                const lastStop = routeStops.length - 1 === index;
                const currentStop = currentStopIndex === index;
                const pastStop = index < currentStopIndex;

                return (
                    <li
                        key={routeStop.id}
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
                                <MTRBusStop route={route} stop={routeStop} />
                            </span>
                            {currentStop && (
                                <div className="ml-3 border-l pl-3">
                                    <MTRBusRouteStopETA
                                        route={route}
                                        stop={routeStop}
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
