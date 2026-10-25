import { z } from "zod";
import { boundSchema } from "./common";

export const routeStopSchema = z.object({
    co: z.string(),
    route: z.string(),
    dir: boundSchema,
    seq: z.coerce.number(),
    stop: z.string(),
});

export const routeStopsSchema = z.object({
    type: z.literal("RouteStop"),
    version: z.string(),
    data: z.array(routeStopSchema),
});
