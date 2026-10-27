import { notFound } from "next/navigation";
import {
    getRouteStopsByRoute,
    getRoutes,
    getStops,
} from "@/api/bus/kmb/server";
import Content from "@/components/content";
import Hero from "@/components/hero";
import { KMBRoute } from "@/components/kmb/route";
import { KMBRouteStops } from "@/components/kmb/route-stops";

const Page = async ({
    params,
}: PageProps<"/[lang]/bus/kmb/routes/[route]/bound/[bound]/service-type/[serviceType]/stops">) => {
    const { route, bound, serviceType } = await params;
    const routes = await getRoutes();
    const routeStops = await getRouteStopsByRoute({
        route,
        direction: bound,
        serviceType,
    });
    routeStops.data.sort((a, b) => a.seq - b.seq);
    const stops = await getStops();

    const routeData = routes.data.find(
        (r) =>
            r.route === route &&
            r.bound === bound &&
            r.serviceType === serviceType,
    );

    if (!routeData) notFound();

    return (
        <>
            <Hero
                title={
                    <h1>
                        <KMBRoute route={routeData} />
                    </h1>
                }
            />
            <Content>
                <KMBRouteStops
                    route={routeData}
                    routeStops={routeStops.data}
                    stops={stops.data}
                />
            </Content>
        </>
    );
};

export default Page;
