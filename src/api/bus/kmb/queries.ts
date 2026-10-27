import { queryOptions } from "@tanstack/react-query";
import { getETA, getRouteStopsByRoute, getRoutes, getStops } from ".";

export const kmbQueries = {
    all: () => ["bus/kmb"] as const,
    routes: () =>
        queryOptions({
            queryKey: [...kmbQueries.all(), "getRoutes"] as const,
            queryFn: getRoutes,
        }),
    stops: () =>
        queryOptions({
            queryKey: [...kmbQueries.all(), "getStops"] as const,
            queryFn: getStops,
        }),
    routeStops: ({
        route,
        direction,
        serviceType,
    }: {
        route: string;
        direction: string;
        serviceType: string;
    }) =>
        queryOptions({
            queryKey: [
                ...kmbQueries.all(),
                "getRouteStopsByRoute",
                route,
                direction,
                serviceType,
            ] as const,
            queryFn: () =>
                getRouteStopsByRoute({ route, direction, serviceType }),
        }),
    eta: ({
        stop,
        route,
        serviceType,
    }: {
        stop: string;
        route: string;
        serviceType: string;
    }) =>
        queryOptions({
            queryKey: [
                ...kmbQueries.all(),
                "getETA",
                stop,
                route,
                serviceType,
            ] as const,
            queryFn: () =>
                getETA({
                    stop,
                    route,
                    serviceType,
                }),
            refetchInterval: 10_000,
            refetchIntervalInBackground: true,
            refetchOnWindowFocus: false,
        }),
};
