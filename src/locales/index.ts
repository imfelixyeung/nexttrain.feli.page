import { createTranslate, type LocaleLookup } from "@/i18n";
import enHK from "./en-HK.json";
import zhHK from "./zh-HK.json";

export const defaultLocale = "en-HK";
export const availableLocales = [defaultLocale, "zh-HK"] as const;
export type Locale = (typeof availableLocales)[number];

export const localeLookup: LocaleLookup = {
    "en-HK": enHK,
    "zh-HK": zhHK,
};

export const translate = createTranslate({
    localeLookup,
    defaultLocale,
});

export function assertValidLocale(locale: string): asserts locale is Locale {
    if (availableLocales.includes(locale as Locale)) return;
    throw new Error(`Unsupported locale, '${locale}'`);
}
