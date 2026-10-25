import { etaListSchema } from "./schemas/eta";
import { routeListSchema } from "./schemas/route";
import { stopListSchema } from "./schemas/stop";

const BASE_URL = "https://data.etabus.gov.hk/";

export const getRoutes = async () => {
    const url = new URL("/v1/transport/kmb/route", BASE_URL);
    const response = await fetch(url);
    const json = await response.json();
    return routeListSchema.parseAsync(json);
};

export const getStops = async () => {
    const url = new URL("/v1/transport/kmb/stop", BASE_URL);
    const response = await fetch(url);
    const json = await response.json();
    return stopListSchema.parseAsync(json);
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
    const url = new URL(
        `/v1/transport/kmb/eta/${stop}/${route}/${serviceType}`,
        BASE_URL,
    );
    const response = await fetch(url);
    const json = await response.json();
    return etaListSchema.parseAsync(json);
};
