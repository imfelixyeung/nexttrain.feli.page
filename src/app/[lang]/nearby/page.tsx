import { Typography } from "@heroui/react";
import { getStops } from "@/api/bus/kmb";
import { NearbyBusStops } from "./page.client";

const Page = async () => {
    const stops = await getStops();
    return (
        <>
            <div className="container mx-auto my-8">
                <Typography.Heading level={1}>Near you</Typography.Heading>
            </div>
            <NearbyBusStops stops={stops.data} />
        </>
    );
};

export default Page;
