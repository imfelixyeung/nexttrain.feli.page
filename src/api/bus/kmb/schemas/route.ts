import { z } from "zod";
import type { LocalisedString } from "@/i18n/types";
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
    .transform(
        ({
            route,
            bound,
            service_type,
            orig_en,
            orig_tc,
            dest_en,
            dest_tc,
        }) => ({
            route,
            bound,
            serviceType: service_type,
            origin: {
                "en-HK": orig_en,
                "zh-HK": orig_tc,
            } satisfies LocalisedString,
            destination: {
                "en-HK": dest_en,
                "zh-HK": dest_tc,
            } satisfies LocalisedString,
        }),
    );

export const routeListSchema = z.object({
    type: z.literal("RouteList"),
    version: z.string(),
    generated_timestamp: z.coerce.date(),
    data: z.array(routeSchema),
});
