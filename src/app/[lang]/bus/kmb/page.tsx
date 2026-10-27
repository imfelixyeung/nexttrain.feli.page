import { Typography } from "@heroui/react";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import type { Route } from "@/api/bus/kmb/schemas/route";
import { getRoutes } from "@/api/bus/kmb/server";
import { LocalisedString } from "@/i18n/utils";

const Page = async () => {
    const routes = await getRoutes();
    const locale = await getLocale();

    const routesByRoutes = routes.data.reduce((map, curr) => {
        map.set(curr.route, map.get(curr.route) ?? []);
        map.get(curr.route)?.push(curr);
        return map;
    }, new Map<string, Route[]>());

    console.log(Array.from(Object.entries(routesByRoutes)));

    return (
        <div>
            <Typography.Heading level={1}>KMB Routes</Typography.Heading>
            <div className="grid grid-cols-2">
                {routesByRoutes
                    .entries()
                    .map(([route, routes]: [string, Route[]]) => (
                        <div key={route}>
                            <Typography.Heading level={2}>
                                {route}
                            </Typography.Heading>
                            <ul>
                                {routes.map(
                                    ({
                                        bound,
                                        serviceType,
                                        origin,
                                        destination,
                                    }) => (
                                        <li
                                            key={`${route}-${bound}-${serviceType}`}
                                        >
                                            <Link
                                                href={
                                                    `/${locale}/bus/kmb/routes/${route}/bound/${bound}/service-type/${serviceType}/stops` as const
                                                }
                                            >
                                                {route}
                                                <LocalisedString
                                                    string={origin}
                                                />{" "}
                                                {"->"}{" "}
                                                <LocalisedString
                                                    string={destination}
                                                />
                                            </Link>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Page;
