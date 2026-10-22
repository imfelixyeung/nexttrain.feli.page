import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { availableLocales, type Locale, localeLookup } from "@/locales";
import { createTranslate } from ".";

export const hasLocale = (locale: string) =>
    availableLocales.includes(locale as Locale);

export const getDictionary = async () => {
    const locale = await lang();
    if (!hasLocale(locale)) notFound();
    return createTranslate({
        localeLookup: localeLookup,
        defaultLocale: locale,
    });
};
