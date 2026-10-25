import { z } from "zod";
import type { LocalisedString } from "@/i18n/types";
import { boundSchema } from "./common";

export const etaSchema = z
    .object({
        co: z.string(),
        route: z.string(),
        dir: boundSchema,
        service_type: z.number(),
        seq: z.number(),
        dest_tc: z.string(),
        dest_sc: z.string(),
        dest_en: z.string(),
        eta_seq: z.number(),
        eta: z.coerce.date().nullable(),
        rmk_tc: z.string(),
        rmk_sc: z.string(),
        rmk_en: z.string(),
        data_timestamp: z.coerce.date(),
    })
    .transform(
        ({
            co,
            route,
            dir,
            service_type,
            seq,
            dest_tc,
            dest_en,
            eta_seq,
            eta,
            rmk_tc,
            rmk_en,
            data_timestamp,
        }) => ({
            co,
            route,
            dir,
            service_type,
            seq,
            destination: {
                "en-HK": dest_en,
                "zh-HK": dest_tc,
            } satisfies LocalisedString,
            eta_seq,
            eta,
            remark: {
                "en-HK": rmk_en,
                "zh-HK": rmk_tc,
            } satisfies LocalisedString,
            data_timestamp,
        }),
    );

export const etaListSchema = z.object({
    type: z.string(),
    version: z.string(),
    generated_timestamp: z.string(),
    data: z.array(etaSchema),
});
