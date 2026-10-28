"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { Route } from "@/api/bus/mtr/schemas/route";
import { LocalisedString } from "@/i18n/utils";
import { MTRBusRouteBadge } from "./route-badge";

export const MTRBusRoute = ({ route: r }: { route: Route }) => {
    const locale = useLocale();
    const { id, ref, name } = r;
    return (
        <Link
            href={`/${locale}/bus/mtr/routes/${id}/ref/${ref}/stops`}
            prefetch={false}
            className="flex items-center gap-2"
        >
            <MTRBusRouteBadge route={id} />
            <span className="font-medium capitalize">
                <LocalisedString string={name} transform="capital" />
            </span>
        </Link>
    );
};
