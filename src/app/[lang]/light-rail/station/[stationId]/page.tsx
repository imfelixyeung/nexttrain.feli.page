import { Typography } from "@heroui/react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { assertValidStation, stations } from "@/data/light-rail";
import { Schedules } from "./page.client";

const Page = async ({
    params,
}: PageProps<"/[lang]/light-rail/station/[stationId]">) => {
    const { stationId: id } = await params;
    const t = await getTranslations();

    const stationId = Number(id);
    const station = stations.find((s) => s.id === stationId);
    if (!station) notFound();
    assertValidStation(stationId);

    return (
        <div className="container mx-auto max-w-lg my-6 p-3">
            <Typography.Heading level={1}>
                {t(`light-rail.stations.${stationId}`)}
            </Typography.Heading>

            <Schedules station={station} />
        </div>
    );
};

export default Page;
