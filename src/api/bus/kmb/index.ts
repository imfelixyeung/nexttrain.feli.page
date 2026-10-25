import { cacheLife } from "next/cache";
import { etaListSchema } from "./schemas/eta";
import { routeListSchema } from "./schemas/route";
import { schema } from "./schemas/route-stop";
import { stopItemSchema, stopListSchema } from "./schemas/stop";

const BASE_URL = "https://data.etabus.gov.hk/";

export const getRoutes = async () => {
    "use cache";
    cacheLife("days");

    const url = new URL("/v1/transport/kmb/route", BASE_URL);
    const response = await fetch(url);
    const json = await response.json();
    return routeListSchema.parseAsync(json);
};

export const getStops = async () => {
    "use cache";
    cacheLife("days");

    const url = new URL("/v1/transport/kmb/stop", BASE_URL);
    const response = await fetch(url);
    const json = await response.json();
    return stopListSchema.parseAsync(json);
};

export const getStop = async ({ stop }: { stop: string }) => {
    const url = new URL(`/v1/transport/kmb/stop/${stop}`, BASE_URL);
    const response = await fetch(url);
    const json = await response.json();
    return stopItemSchema.parseAsync(json);
};

export const getRouteStops = async () => {
    "use cache";
    cacheLife("days");

    const url = new URL("/v1/transport/kmb/route-stop", BASE_URL);
    const response = await fetch(url);
    const json = await response.json();
    return schema.parseAsync(json);
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

    const url = new URL(
        `/v1/transport/kmb/eta/${stop}/${route}/${serviceType}`,
        BASE_URL,
    );
    const response = await fetch(url);
    const json = await response.json();
    return etaListSchema.parseAsync(json);
};
