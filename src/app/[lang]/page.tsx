import { Surface, Typography } from "@heroui/react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { stations } from "@/data/light-rail";
import { lineIds, lines } from "@/data/mtr";
import {
    createLightRailLink,
    createLineLink,
} from "@/utils/createRealtimeLink";

const IndexPage = async () => {
    const t = await getTranslations();
    const locale = await getLocale();

    return (
        <div className="mx-2 mt-6 space-y-6">
            <div className="w-full max-w-xl mx-auto">
                <Typography.Heading level={2} className="mb-3">
                    MTR
                </Typography.Heading>
                <Surface variant="secondary">
                    <ul className="p-2 text-center bg-base-200 menu rounded-box">
                        {lineIds.map((line) => (
                            <li key={`${line}`} className="flex items-center">
                                <div
                                    style={{
                                        backgroundColor: lines[line].colour,
                                    }}
                                    className="h-2 w-6 rounded-full"
                                ></div>
                                <Link
                                    href={createLineLink(line, locale)}
                                    className="block w-full px-4 py-2 hover:underline hover:font-semibold mr-6"
                                >
                                    {t(`mtr.lines.${line}`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Surface>
            </div>

            <div className="w-full max-w-xl mx-auto">
                <Typography.Heading level={2} className="mb-3">
                    Light Rail
                </Typography.Heading>
                <Surface variant="secondary">
                    <ul className="p-2 text-center bg-base-200 menu rounded-box">
                        {stations.map((station) => (
                            <li key={station.id} className="flex items-center">
                                <div className="h-2 w-6 rounded-full"></div>
                                <Link
                                    href={createLightRailLink(
                                        station.id,
                                        locale,
                                    )}
                                    className="block w-full px-4 py-2 hover:underline hover:font-semibold mr-6"
                                >
                                    {t(`light-rail.stations.${station.id}`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Surface>
            </div>
        </div>
    );
};

export default IndexPage;
