import { defaultLocale } from "@/locales";

export const createRealtimeLink = (
    line: string,
    station: string,
    locale = defaultLocale,
) => `/${locale}/mtr/line/${line}/station/${station}/realtime`;

export const createLineLink = (line: string, locale = defaultLocale) =>
    `/${locale}/mtr/line/${line}`;

export const createLightRailLink = (
    stationId: number,
    locale = defaultLocale,
) => `/${locale}/light-rail/station/${stationId}`;
