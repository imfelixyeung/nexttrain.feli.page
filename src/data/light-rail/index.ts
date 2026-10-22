import lightRailStationsJson from "./stations.json";

export const stations = lightRailStationsJson;
export type Station = (typeof stations)[number];
