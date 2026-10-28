"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { Route } from "@/api/bus/mtr/schemas/route";
import type { Stop } from "@/api/bus/mtr/schemas/stop";
import { LocalisedString } from "@/i18n/utils";

const MTRBusStop = ({ route, stop }: { route: Route; stop: Stop }) => {
    const locale = useLocale();
    return (
        <Link
            href={`/${locale}/bus/mtr/routes/${route.id}/ref/${route.ref}/stops/${stop.id}`}
            prefetch={false}
            scroll={false}
        >
            <LocalisedString string={stop.name} transform="capital" />
        </Link>
    );
};

export default MTRBusStop;
