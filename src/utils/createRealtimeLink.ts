import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";

export const createRealtimeLink = (
    line: string,
    station: string,
    locale: Locale = routing.defaultLocale,
) => `/${locale}/mtr/line/${line}/station/${station}/realtime`;

export const createLineLink = (
    line: string,
    locale: Locale = routing.defaultLocale,
) => `/${locale}/mtr/line/${line}`;

export const createLightRailLink = (
    stationId: number,
    locale: Locale = routing.defaultLocale,
) => `/${locale}/light-rail/station/${stationId}`;
