import { notFound } from "next/navigation";
import {
    getRouteStopsByRoute,
    getRoutes,
    getStops,
} from "@/api/bus/kmb/server";
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
            <div className="py-8 border-b">
                <div className="container mx-auto">
                    <h1>
                        <KMBRoute route={routeData} />
                    </h1>
                </div>
            </div>
            <div className="container mx-auto py-8">
                <KMBRouteStops
                    route={routeData}
                    routeStops={routeStops.data}
                    stops={stops.data}
                />
            </div>
        </>
    );
};

export default Page;
