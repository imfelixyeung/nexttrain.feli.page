import { z } from "zod";
import { extractLocalisedStrings } from "@/i18n/utils/extract-localised";
import { boundSchema } from "./common";

const routeSchema = z
    .object({
        route: z.string(),
        bound: boundSchema,
        service_type: z.string(),
        orig_en: z.string(),
        orig_tc: z.string(),
        orig_sc: z.string(),
        dest_en: z.string(),
        dest_tc: z.string(),
        dest_sc: z.string(),
    })
    .transform(({ route, bound, service_type, ...rest }) => ({
        route,
        bound,
        serviceType: service_type,
        origin: extractLocalisedStrings(rest, {
            "en-HK": "orig_en",
            "zh-HK": "orig_tc",
        }),
        destination: extractLocalisedStrings(rest, {
            "en-HK": "dest_en",
            "zh-HK": "dest_tc",
        }),
    }));

export type Route = z.infer<typeof routeSchema>;

export const routeListSchema = z.object({
    type: z.literal("RouteList"),
    version: z.string(),
    generated_timestamp: z.coerce.date(),
    data: z.array(routeSchema),
});
