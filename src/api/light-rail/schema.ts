import { z } from "zod";
import { extractLocalisedStrings } from "@/i18n/utils/extract-localised";

export const routeSchema = z
    .object({
        train_length: z.number(),
        arrival_departure: z.enum(["A", "D"]),
        dest_en: z.string(),
        dest_ch: z.string(),
        additionalInfo1: z.string(),
        routeRemarkEng2: z.string(),
        routeRemarkChi2: z.string(),
        time_en: z.string(),
        time_ch: z.string(),
        special: z.number(),
        route_no: z.string(),
        stop: z.number(),
    })
    .transform((route) => {
        const {
            train_length,
            arrival_departure,
            additionalInfo1,
            routeRemarkEng2,
            routeRemarkChi2,
            special,
            route_no,
            stop,
        } = route;
        return {
            train_length,
            arrival_departure,
            destination: extractLocalisedStrings(route, {
                "en-HK": "dest_en",
                "zh-HK": "dest_ch",
            }),
            additionalInfo1,
            routeRemarkEng2,
            routeRemarkChi2,
            time: extractLocalisedStrings(route, {
                "en-HK": "time_en",
                "zh-HK": "time_ch",
            }),
            special,
            route_no,
            stop,
        };
    });

export const platformSchema = z.object({
    platform_id: z.number(),
    route_list: z.array(routeSchema).nullish(),
});

export const schema = z.object({
    platform_list: z.array(platformSchema),
    status: z.number(),
    system_time: z.string(),
});
