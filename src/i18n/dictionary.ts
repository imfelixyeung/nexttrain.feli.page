import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { availableLocales, localeLookup } from "@/locales";
import { createTranslate } from ".";

export const hasLocale = (locale: string) => availableLocales.includes(locale);

export const getDictionary = async () => {
    const locale = await lang();
    if (!hasLocale(locale)) notFound();
    return createTranslate({
        localeLookup: localeLookup,
        defaultLocale: locale,
    });
};
