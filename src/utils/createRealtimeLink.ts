import { defaultLocale } from "@/locales";

export const createRealtimeLink = (
    line: string,
    station: string,
    locale = defaultLocale,
) => `/${locale}/realtime/${line}/${station}`;
