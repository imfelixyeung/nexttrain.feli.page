import { cacheLife } from "next/cache";
import * as api from ".";

export const getRoutes = async () => {
    "use cache";
    cacheLife("days");

    return api.getRoutes();
};

export const getStops = async () => {
    "use cache";
    cacheLife("days");

    return api.getStops();
};

export const getStop = async ({ stop }: { stop: string }) => {
    "use cache";
    cacheLife("days");

    return api.getStop({ stop });
};

export const getRouteStops = async () => {
    "use cache";
    cacheLife("days");

    return api.getRouteStops();
};

export const getRouteStopsByRoute = async ({
    route,
    direction,
    serviceType,
}: {
    route: string;
    direction: string;
    serviceType: string;
}) => {
    "use cache";
    cacheLife("days");

    return api.getRouteStopsByRoute({ route, direction, serviceType });
};

export const getETA = async ({
    stop,
    route,
    serviceType,
}: {
    stop: string;
    route: string;
    serviceType: string;
}) => {
    "use cache";
    cacheLife("seconds");

    return api.getETA({ stop, route, serviceType });
};
