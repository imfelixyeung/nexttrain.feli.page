import type { Locale } from "next-intl";
import type { LocalisedString } from "../types";

export const extractLocalisedStrings = <Localised extends string>(
    object: Record<Localised, string>,
    keys: Record<Locale, Localised>,
): LocalisedString => {
    return Object.fromEntries(
        Object.entries(keys).map(([locale, key]) => [locale, object[key]]),
    ) as LocalisedString;
};
