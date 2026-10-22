import { defaultLocale } from "@/locales";

export const createRealtimeLink = (
    line: string,
    station: string,
    locale = defaultLocale,
) => `/${locale}/mtr/line/${line}/station/${station}/realtime`;

export const createLineLink = (line: string, locale = defaultLocale) =>
    `/${locale}/mtr/line/${line}`;
