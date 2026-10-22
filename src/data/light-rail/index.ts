import { stations as _stations } from "./stations";

export const stations = _stations;
export type Station = (typeof stations)[number];
export type StationID = (typeof stations)[number]["id"];

export function assertValidStation(
    stationId: unknown,
): asserts stationId is StationID {
    const id = Number(stationId);
    const valid = stations.find((station) => station.id === id);
    if (valid) return;
    throw new Error(`Invalid station id, ${stationId}`);
}
