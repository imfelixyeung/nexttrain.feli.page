import { z } from "zod";
import { boundSchema } from "./common";

export const etaSchema = z.object({
    co: z.string(),
    route: z.string(),
    dir: boundSchema,
    service_type: z.number(),
    seq: z.number(),
    dest_tc: z.string(),
    dest_sc: z.string(),
    dest_en: z.string(),
    eta_seq: z.number(),
    eta: z.string(),
    rmk_tc: z.string(),
    rmk_sc: z.string(),
    rmk_en: z.string(),
    data_timestamp: z.coerce.date(),
});

export const etaListSchema = z.object({
    type: z.string(),
    version: z.string(),
    generated_timestamp: z.string(),
    data: z.array(etaSchema),
});
