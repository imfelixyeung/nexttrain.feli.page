import { z } from "zod";
import type { LocalisedString } from "@/i18n/types";

const routeSchema = z
    .object({
        route: z.string(),
        orig_en: z.string(),
        orig_tc: z.string(),
        dest_en: z.string(),
        dest_tc: z.string(),
    })
    .transform(({ route, orig_en, orig_tc, dest_en, dest_tc }) => ({
        route,
        origin: {
            "en-HK": orig_en,
            "zh-HK": orig_tc,
        } satisfies LocalisedString,
        destination: {
            "en-HK": dest_en,
            "zh-HK": dest_tc,
        } satisfies LocalisedString,
    }));

export const routeListSchema = z.object({
    type: z.literal("RouteList"),
    version: z.string(),
    data: z.array(routeSchema),
});
