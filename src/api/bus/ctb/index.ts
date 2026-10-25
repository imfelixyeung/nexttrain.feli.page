import { cacheLife } from "next/cache";
import { etaListSchema } from "./schemas/eta";
import { routeListSchema } from "./schemas/route";
import { routeStopsSchema } from "./schemas/route-stop";
import { stopItemSchema } from "./schemas/stop";

const BASE_URL = "https://rt.data.gov.hk/";

export const getCtbRoutes = async () => {
    "use cache";
    cacheLife("days");

    const url = new URL("/v1/transport/citybus-nwfb/route/ctb", BASE_URL);
    const response = await fetch(url);
    const json = await response.json();
    return routeListSchema.parseAsync(json);
};

export const getCtbStop = async (stopId: string) => {
    "use cache";
    cacheLife("days");

    const url = new URL(`/v1/transport/citybus-nwfb/stop/${stopId}`, BASE_URL);
    const response = await fetch(url);
    const json = await response.json();
    return stopItemSchema.parseAsync(json);
};

export const getCtbStops = async () => {
    // Citybus doesn't expose all stops in one API call so lets aggregate it ourselves.
    const routes = await getCtbRoutes();

    const stops = new Set();
    for (const { route } of routes.data) {
        const data = await getCtbRouteStops({ route, direction: "inbound" });
        for (const stop of data.data) {
            stops.add(stop.stop);
        }
    }

    console.log(stops.size);

    return [];
};

export const getCtbRouteStops = async ({
    route,
    direction,
}: {
    route: string;
    direction: string;
}) => {
    const url = new URL(
        `/v1/transport/citybus-nwfb/route-stop/ctb/${route}/${direction}`,
        BASE_URL,
    );
    const response = await fetch(url);
    const json = await response.json();
    return routeStopsSchema.parseAsync(json);
};

export const getCtbETA = async ({
    stop,
    route,
}: {
    stop: string;
    route: string;
}) => {
    "use cache";
    cacheLife("seconds");

    const url = new URL(
        `/v1/transport/citybusnwfb/eta/ctb/${stop}/${route} `,
        BASE_URL,
    );
    const response = await fetch(url);
    const json = await response.json();
    return etaListSchema.parseAsync(json);
};
