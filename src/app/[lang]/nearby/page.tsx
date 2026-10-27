import { Typography } from "@heroui/react";
import { NearbyBusStops } from "./page.client";

const Page = async () => {
    return (
        <>
            <div className="container mx-auto my-8">
                <Typography.Heading level={1}>Near you</Typography.Heading>
            </div>
            <NearbyBusStops />
        </>
    );
};

export default Page;
