import { schema } from "./schema";

export const getLightRailStationData = async (stationId: number) => {
    const url = new URL(
        `https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule`,
    );
    url.searchParams.set("station_id", stationId.toString());

    const json = await fetch(url)
        .then((res) => res.json())
        .then(schema.parseAsync);

    return json;
};
