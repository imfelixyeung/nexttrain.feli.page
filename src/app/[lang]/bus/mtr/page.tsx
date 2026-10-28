import { Typography } from "@heroui/react";
import Content from "@/components/content";
import Hero from "@/components/hero";
import { RouteList } from "./page.client";

const Page = () => {
    return (
        <div>
            <Hero
                title={
                    <Typography.Heading level={1}>
                        MTR Bus Routes
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
