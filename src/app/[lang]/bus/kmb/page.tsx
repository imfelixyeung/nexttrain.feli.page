import { Typography } from "@heroui/react";
import Content from "@/components/content";
import Hero from "@/components/hero";
import { RouteList } from "./page.client";

const Page = async () => {
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
                <RouteList />
            </Content>
        </div>
    );
};

export default Page;
