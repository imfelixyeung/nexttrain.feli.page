"use client";

import { Typography } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getRoutes } from "@/api/bus/kmb";
import type { Route } from "@/api/bus/kmb/schemas/route";
import { KMBRoute } from "@/components/kmb/route";

export const RouteList = () => {
    const locale = useLocale();
    const t = useTranslations();
    const { data, isLoading } = useQuery({
        queryKey: [getRoutes],
        queryFn: getRoutes,
    });
    if (!data || isLoading) return t("common.loading");

    const routesByRoutes = data.data.reduce((map, curr) => {
        map.set(curr.route, map.get(curr.route) ?? []);
        map.get(curr.route)?.push(curr);
        return map;
    }, new Map<string, Route[]>());

    return (
        <>
            {[...routesByRoutes].map(([route, routes]: [string, Route[]]) => (
                <div key={route}>
                    <Typography.Heading level={2}>{route}</Typography.Heading>
                    <ul>
                        {routes.map((routeData) => {
                            const { bound, serviceType } = routeData;
                            return (
                                <li key={`${route}-${bound}-${serviceType}`}>
                                    <Link
                                        href={
                                            `/${locale}/bus/kmb/routes/${route}/bound/${bound}/service-type/${serviceType}/stops` as const
                                        }
                                    >
                                        <KMBRoute route={routeData} />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </>
    );
};
