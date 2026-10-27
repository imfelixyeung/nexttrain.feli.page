import { Typography } from "@heroui/react";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import type { Route } from "@/api/bus/kmb/schemas/route";
import { getRoutes } from "@/api/bus/kmb/server";
import Hero from "@/components/hero";
import { KMBRoute } from "@/components/kmb/route";
import Content from "@/components/content";

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
            <Hero
                title={
                    <Typography.Heading level={1}>
                        KMB Routes
                    </Typography.Heading>
                }
            />
            <Content>
                {[...routesByRoutes].map(
                    ([route, routes]: [string, Route[]]) => (
                        <div key={route}>
                            <Typography.Heading level={2}>
                                {route}
                            </Typography.Heading>
                            <ul>
                                {routes.map((routeData) => {
                                    const { bound, serviceType } = routeData;
                                    return (
                                        <li
                                            key={`${route}-${bound}-${serviceType}`}
                                        >
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
                    ),
                )}
            </Content>
        </div>
    );
};

export default Page;
