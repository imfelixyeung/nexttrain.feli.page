"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { Route } from "@/api/bus/kmb/schemas/route";
import type { Stop } from "@/api/bus/kmb/schemas/stop";
import { LocalisedString } from "@/i18n/utils";

const KMBStop = ({ route, stop }: { route: Route; stop: Stop }) => {
    const locale = useLocale();
    return (
        <Link
            href={`/${locale}/bus/kmb/routes/${route.route}/bound/${route.bound}/service-type/${route.serviceType}/stops/${stop.stop}`}
            prefetch={false}
            scroll={false}
        >
            <LocalisedString string={stop.name} transform="capital" />
        </Link>
    );
};

export default KMBStop;
