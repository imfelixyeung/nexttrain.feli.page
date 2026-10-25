import { Typography } from "@heroui/react";
import { formatDistanceToNow } from "date-fns";
import { getETA, getRouteStops, getRoutes, getStop } from "@/api/bus/kmb";
import { LocalisedString } from "@/i18n/utils";

const Page = async ({ params }: PageProps<"/[lang]/bus/kmb/stops/[stop]">) => {
    const { stop: stopId } = await params;
    const stop = await getStop({ stop: stopId });
    const routeStops = await getRouteStops().then((res) =>
        res.data.filter((rs) => rs.stop === stop.data.stop),
    );
    const routes = await getRoutes().then((res) =>
        res.data.filter((r) => routeStops.find((rs) => rs.route === r.route)),
    );

    return (
        <div className="container my-8 mx-auto">
            <Typography.Heading level={1}>
                <LocalisedString string={stop.data.name} />
            </Typography.Heading>

            <div className="flex flex-col gap-6">
                {routes.map(
                    ({ route, bound, origin, destination, serviceType }) => (
                        <div key={`${route}-${bound}`}>
                            <strong>{route}</strong>
                            <p>
                                <LocalisedString string={origin} /> to{" "}
                                <LocalisedString string={destination} />
                            </p>
                            <ETA
                                stop={stopId}
                                route={route}
                                serviceType={serviceType}
                            />
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

const ETA = async (props: {
    stop: string;
    route: string;
    serviceType: string;
}) => {
    const eta = await getETA(props);

    return (
        <ol>
            {eta.data.map(({ eta, eta_seq }) => {
                if (eta === null) return <li key={eta_seq}>-</li>;
                return <li key={eta_seq}>{formatDistanceToNow(eta)}</li>;
            })}
        </ol>
    );
};

export default Page;
