import { z } from "zod";
import { boundSchema } from "./common";

export const routeStopSchema = z.object({
    route: z.string(),
    bound: boundSchema,
    service_type: z.string(),
    seq: z.coerce.number(),
    stop: z.string(),
});

export type RouteStop = z.infer<typeof routeStopSchema>;

export const routeStopsResponseSchema = z.object({
    type: z.literal("RouteStop"),
    version: z.string(),
    generated_timestamp: z.coerce.date(),
    data: z.array(routeStopSchema),
});

export type RouteStopsResponseSchema = z.infer<typeof routeStopsResponseSchema>;
