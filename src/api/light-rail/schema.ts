import { z } from "zod";

export const routeSchema = z.object({
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
