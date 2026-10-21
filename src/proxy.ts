import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";
import { availableLocales, defaultLocale } from "./locales";

function getLocale(request: NextRequest) {
    const headers = {
        "accept-language": request.headers.get("accept-language") ?? "",
    };
    const languages = new Negotiator({ headers }).languages();
    return match(languages, availableLocales, defaultLocale);
}

export function proxy(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = availableLocales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ["/"],
};
