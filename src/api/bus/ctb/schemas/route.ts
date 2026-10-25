import { z } from "zod";
import { extractLocalisedStrings } from "@/i18n/utils/extract-localised";

const routeSchema = z
    .object({
        route: z.string(),
        orig_en: z.string(),
        orig_tc: z.string(),
        dest_en: z.string(),
        dest_tc: z.string(),
    })
    .transform(({ route, ...rest }) => ({
        route,
        origin: extractLocalisedStrings(rest, {
            "en-HK": "orig_en",
            "zh-HK": "orig_tc",
        }),
        destination: extractLocalisedStrings(rest, {
            "en-HK": "dest_en",
            "zh-HK": "dest_tc",
        }),
    }));

export const routeListSchema = z.object({
    type: z.literal("RouteList"),
    version: z.string(),
    data: z.array(routeSchema),
});
