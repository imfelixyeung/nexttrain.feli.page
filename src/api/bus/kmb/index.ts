import { etaListSchema } from "./schemas/eta";
import { routeListSchema } from "./schemas/route";
import { routeLineSchema } from "./schemas/route-line";
import { routeStopsResponseSchema } from "./schemas/route-stop";
import { stopItemSchema, stopListSchema } from "./schemas/stop";

const BASE_URL = "https://data.etabus.gov.hk/";
const MIRROR_URL = "https://cdn.transit.feli.page/";

export const getRoutes = async () => {
    const url = new URL(
        "/data.gov.hk/mirror/data.etabus.gov.hk/v1/transport/kmb/route",
        MIRROR_URL,
    );
    const response = await fetch(url);
    const json = await response.json();
    return routeListSchema.parseAsync(json);
};

export const getStops = async () => {
    const url = new URL(
        "/data.gov.hk/mirror/data.etabus.gov.hk/v1/transport/kmb/stop",
        MIRROR_URL,
    );
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
    const url = new URL(
        "/data.gov.hk/mirror/data.etabus.gov.hk/v1/transport/kmb/route-stop",
        MIRROR_URL,
    );
    const response = await fetch(url);
    const json = await response.json();
    return routeStopsResponseSchema.parseAsync(json);
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
    const url = new URL(
        `/v1/transport/kmb/route-stop/${route}/${direction}/${serviceType}`,
        BASE_URL,
    );
    const response = await fetch(url);
    const json = await response.json();
    return routeStopsResponseSchema.parseAsync(json);
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

export const getRouteLine = async ({ route }: { route: string }) => {
    const url = new URL(
        "https://portal.csdi.gov.hk/server/rest/services/common/td_rcd_1638844988873_41214/FeatureServer/0/query",
    );
    url.searchParams.set("f", "geojson");
    url.searchParams.set(
        "where",
        `COMPANY_CODE='KMB' AND ROUTE_NAMEE='${route}'`,
    );
    url.searchParams.set("outFields", "*");

    const response = await fetch(url);
    const json = await response.json();
    return routeLineSchema.parseAsync(json);
};
