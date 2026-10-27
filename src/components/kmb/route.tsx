"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { Route } from "@/api/bus/kmb/schemas/route";
import { LocalisedString } from "@/i18n/utils";
import { KMBRouteBadge } from "./route-badge";

export const KMBRoute = ({ route: r }: { route: Route }) => {
    const locale = useLocale();
    const { route, destination, bound, serviceType } = r;
    return (
        <Link
            href={`/${locale}/bus/kmb/routes/${route}/bound/${bound}/service-type/${serviceType}/stops`}
            className="flex items-center gap-2"
        >
            <KMBRouteBadge route={route} />
            <span className="font-medium capitalize">
                <LocalisedString string={destination} transform="capital" />
            </span>
        </Link>
    );
};
