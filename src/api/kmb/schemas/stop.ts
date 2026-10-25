import { z } from "zod";
import type { LocalisedString } from "@/i18n/types";

export const stopSchema = z
    .object({
        stop: z.string(),
        name_en: z.string(),
        name_tc: z.string(),
        name_sc: z.string(),
        lat: z.coerce.number(),
        long: z.coerce.number(),
    })
    .transform(({ stop, name_en, name_tc, lat, long }) => ({
        stop,
        name: {
            "en-HK": name_en,
            "zh-HK": name_tc,
        } satisfies LocalisedString,
        lat,
        long,
    }));

export const stopListSchema = z.object({
    type: z.literal("StopList"),
    version: z.string(),
    generated_timestamp: z.coerce.date(),
    data: z.array(stopSchema),
});
