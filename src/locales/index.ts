import { createTranslate, type LocaleLookup } from "@/i18n";
import enHK from "./en-HK.json";
import zhHK from "./zh-HK.json";

const localeLookup: LocaleLookup = {
    "en-HK": enHK,
    "zh-HK": zhHK,
};

export const availableLocales = Object.keys(localeLookup);

export const defaultLocale = "en-HK";

export const translate = createTranslate({
    localeLookup,
    defaultLocale,
});
