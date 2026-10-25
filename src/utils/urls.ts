import type { Locale } from "next-intl";

export const createRealtimeLink = ({
    line,
    station,
    locale,
}: {
    line: string;
    station: string;
    locale: Locale;
}) => `/${locale}/mtr/line/${line}/station/${station}/realtime` as const;

export const createLineLink = ({
    line,
    locale,
}: {
    line: string;
    locale: Locale;
}) => `/${locale}/mtr/line/${line}` as const;

export const createLightRailLink = ({
    stationId,
    locale,
}: {
    stationId: number;
    locale: Locale;
}) => `/${locale}/light-rail/station/${stationId}` as const;

export const createHomeLink = ({ locale }: { locale: Locale }) =>
    `/${locale}` as const;
