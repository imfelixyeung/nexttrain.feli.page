import { parse } from "csv-parse/sync";
import type { Locale } from "next-intl";
import { getMirrorURL } from "@/api/mirror";
import { etaSchema } from "./schemas/eta";
import { routesSchema } from "./schemas/route";
import { stopsSchema } from "./schemas/stop";

const BASE_URL = new URL("https://opendata.mtr.com.hk");

export const getBusStops = async () => {
    const url = getMirrorURL(new URL("/data/mtr_bus_stops.csv", BASE_URL));

    return await fetch(url)
        .then((res) => res.text())
        .then((csv) =>
            parse(csv, { columns: true, cast: false, skipEmptyLines: true }),
        )
        .then(stopsSchema.parseAsync);
};

export const getBusRoutes = async () => {
    const url = getMirrorURL(new URL("/data/mtr_bus_routes.csv", BASE_URL));
    return await fetch(url)
        .then((res) => res.text())
        .then((csv) =>
            parse(csv, { columns: true, cast: false, skipEmptyLines: true }),
        )
        .then(routesSchema.parseAsync);
};

export const getBusETA = async ({
    route,
    locale,
}: {
    route: string;
    locale: Locale;
}) => {
    const lang = locale.split("-")[0] ?? "";
    const url = new URL(
        "https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule",
    );
    url.searchParams.set("language", lang);
    url.searchParams.set("routeName", route);

    const content = { language: lang, routeName: route };

    const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(content),
    });
    const json = await response.json();
    return etaSchema.parseAsync(json);
};
