import { queryOptions } from "@tanstack/react-query";
import type { Locale } from "next-intl";
import { getBusETA, getBusRoutes, getBusStops } from ".";

export const mtrQueries = {
    all: () => ["bus/mtr"] as const,
    routes: () =>
        queryOptions({
            queryKey: [...mtrQueries.all(), "getBusRoutes"] as const,
            queryFn: getBusRoutes,
        }),
    stops: () =>
        queryOptions({
            queryKey: [...mtrQueries.all(), "getBusStops"] as const,
            queryFn: getBusStops,
        }),
    eta: (props: { route: string; locale: Locale }) =>
        queryOptions({
            queryKey: [...mtrQueries.all(), "getBusETA", props] as const,
            queryFn: () => getBusETA(props),
            refetchInterval: 10_000,
            refetchIntervalInBackground: true,
            refetchOnWindowFocus: false,
        }),
};
