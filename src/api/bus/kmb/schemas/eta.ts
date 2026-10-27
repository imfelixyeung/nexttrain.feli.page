import { z } from "zod";
import { extractLocalisedStrings } from "@/i18n/utils/extract-localised";
import { boundSchema } from "./common";

export const etaSchema = z
    .object({
        co: z.string(),
        route: z.string(),
        dir: boundSchema,
        service_type: z.coerce.string(),
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
            eta_seq,
            eta,
            data_timestamp,
            ...rest
        }) => ({
            co,
            route,
            dir,
            service_type,
            seq,
            destination: extractLocalisedStrings(rest, {
                "en-HK": "dest_en",
                "zh-HK": "dest_tc",
            }),
            eta_seq,
            eta,
            remark: rest.rmk_en.trim()
                ? extractLocalisedStrings(rest, {
                      "en-HK": "rmk_en",
                      "zh-HK": "rmk_tc",
                  })
                : null,
            data_timestamp,
        }),
    );

export const etaListSchema = z.object({
    type: z.string(),
    version: z.string(),
    generated_timestamp: z.string(),
    data: z.array(etaSchema),
});
