import { z } from "zod";

export const routeLineSchema = z.object({
    type: z.literal("FeatureCollection"),
    features: z.array(
        z.object({
            type: z.literal("Feature"),
            id: z.number(),
            geometry: z.object({
                type: z.literal("MultiLineString"),
                coordinates: z.array(z.array(z.array(z.number()))),
            }),
            properties: z.object({
                OBJECTID: z.number(),
                ROUTE_ID: z.number(),
                ROUTE_SEQ: z.number(),
                COMPANY_CODE: z.string(),
                ROUTE_NAMEE: z.string(),
                ST_STOP_ID: z.number(),
                ST_STOP_NAMEE: z.string(),
                ST_STOP_NAMEC: z.string(),
                ST_STOP_NAMES: z.string(),
                ED_STOP_ID: z.number(),
                ED_STOP_NAMEE: z.string(),
                ED_STOP_NAMEC: z.string(),
                ED_STOP_NAMES: z.string(),
                Shape__Length: z.number(),
            }),
        }),
    ),
});
