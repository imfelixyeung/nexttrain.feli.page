import { Typography } from "@heroui/react";
import { notFound } from "next/navigation";
import { stations } from "@/data/light-rail";
import { assertValidLocale } from "@/locales";
import { Schedules } from "./page.client";

const Page = async ({
    params,
}: PageProps<"/[lang]/light-rail/station/[stationId]">) => {
    const { lang, stationId: id } = await params;
    assertValidLocale(lang);

    const stationId = Number(id);
    const station = stations.find((s) => s.id === stationId);
    if (!station) notFound();

    return (
        <div className="container mx-auto max-w-lg my-6 p-3">
            <Typography.Heading level={1}>
                {station["name.en-HK"]}
            </Typography.Heading>

            <Schedules station={station} />
        </div>
    );
};

export default Page;
