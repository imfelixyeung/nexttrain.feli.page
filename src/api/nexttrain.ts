import {
    Direction,
    LineStation,
    ResponseJson,
    CreateURLOptions,
} from "./interfaces";

const endpoint = "https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php";

export const createURL = ({ line, station }: CreateURLOptions) =>
    `${endpoint}?line=${line}&sta=${station}`;

export const normaliseJson = (json: any) => {
    const { sys_time, curr_time, data, status, message, isdelay } =
        json as ResponseJson;
    const key = Object.keys(data)[0];
    const lineStation = data[key];
    const { UP, DOWN } = lineStation;
    return {
        sys_time,
        curr_time,
        data: { UP, DOWN },
        status,
        message,
        isdelay,
    };
};
