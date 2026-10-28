import { z } from "zod";
import { extractLocalisedStrings } from "@/i18n/utils/extract-localised";

export const routeSchema = z
    .object({
        ROUTE_ID: z.string(),
        ROUTE_NAME_CHI: z.string(),
        ROUTE_NAME_ENG: z.string(),
        IS_CIRCULAR: z.coerce.boolean(),
        LINE_UP: z.string(),
        LINE_DOWN: z.string(),
        REFERENCE_ID: z.string(),
    })
    .transform(
        ({
            ROUTE_ID: id,
            IS_CIRCULAR: isCircular,
            LINE_UP: lineUp,
            LINE_DOWN: lineDown,
            REFERENCE_ID: ref,
            ...rest
        }) => ({
            id,
            name: extractLocalisedStrings(rest, {
                "en-HK": "ROUTE_NAME_ENG",
                "zh-HK": "ROUTE_NAME_CHI",
            }),
            isCircular,
            lineUp,
            lineDown,
            ref,
        }),
    );

export type Route = z.infer<typeof routeSchema>;

export const routesSchema = z.array(routeSchema);
