import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
    if (!locale) {
        const paramValue = await lang();
        if (hasLocale(routing.locales, paramValue)) {
            locale = paramValue;
        } else {
            notFound();
        }
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
