import { z } from "zod";
import type { LocalisedString } from "@/i18n/types";
import { extractLocalisedStrings } from "@/i18n/utils/extract-localised";

export const stopSchema = z
    .object({
        stop: z.string(),
        name_en: z.string(),
        name_tc: z.string(),
        name_sc: z.string(),
        lat: z.coerce.number(),
        long: z.coerce.number(),
    })
    .transform(({ stop, lat, long, ...rest }) => ({
        stop,
        name: extractLocalisedStrings(rest, {
            "en-HK": "name_en",
            "zh-HK": "name_tc",
        }) satisfies LocalisedString,
        latitude: lat,
        longitude: long,
    }));

export type Stop = z.infer<typeof stopSchema>;

export const stopListSchema = z.object({
    type: z.literal("StopList"),
    version: z.string(),
    generated_timestamp: z.coerce.date(),
    data: z.array(stopSchema),
});

export const stopItemSchema = z.object({
    type: z.literal("Stop"),
    version: z.string(),
    generated_timestamp: z.coerce.date(),
    data: stopSchema,
});

export type StopList = z.infer<typeof stopListSchema>;
