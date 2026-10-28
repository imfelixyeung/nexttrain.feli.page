import { z } from "zod";
import { extractLocalisedStrings } from "@/i18n/utils/extract-localised";

export const stopSchema = z
    .object({
        ROUTE_ID: z.string(),
        DIRECTION: z.string(),
        STATION_SEQNO: z.string(),
        STATION_ID: z.string(),
        STATION_LATITUDE: z.coerce.number(),
        STATION_LONGITUDE: z.coerce.number(),
        STATION_NAME_CHI: z.string(),
        STATION_NAME_ENG: z.string(),
        REFERENCE_ID: z.string(),
    })
    .transform(
        ({
            STATION_ID: id,
            ROUTE_ID: route,
            REFERENCE_ID: ref,
            STATION_LATITUDE: latitude,
            STATION_LONGITUDE: longitude,
            ...rest
        }) => ({
            id,
            route,
            name: extractLocalisedStrings(rest, {
                "en-HK": "STATION_NAME_ENG",
                "zh-HK": "STATION_NAME_CHI",
            }),
            latitude,
            longitude,
            ref,
        }),
    );

export type Stop = z.infer<typeof stopSchema>;

export const stopsSchema = z.array(stopSchema);
