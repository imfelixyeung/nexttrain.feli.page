import { buttonVariants, Chip, Surface, Typography } from "@heroui/react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { stations } from "@/data/light-rail";
import { lineIds, lines } from "@/data/mtr";
import { createLightRailLink, createLineLink } from "@/utils/urls";

const IndexPage = async () => {
    const t = await getTranslations();
    const locale = await getLocale();

    return (
        <div className="mx-2 mt-6 space-y-6">
            <div className="mx-auto w-full max-w-xl">
                <Typography.Heading level={2} className="mb-3">
                    {t("transits.mtr")}
                </Typography.Heading>
                <Surface variant="secondary">
                    <ul className="bg-base-200 menu rounded-box p-2 text-center">
                        {lineIds.map((line) => (
                            <li key={`${line}`} className="flex items-center">
                                <div
                                    style={{
                                        backgroundColor: lines[line].colour,
                                    }}
                                    className="h-2 w-6 rounded-full"
                                ></div>
                                <Link
                                    href={createLineLink({ line, locale })}
                                    prefetch={false}
                                    className="mr-6 block w-full px-4 py-2 hover:font-semibold hover:underline"
                                >
                                    {t(`mtr.lines.${line}`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Surface>
            </div>

            <div className="mx-auto w-full max-w-xl">
                <Typography.Heading level={2} className="mb-3">
                    {t("transits.light-rail")}
                </Typography.Heading>
                <Surface variant="secondary">
                    <ul className="bg-base-200 menu rounded-box p-2 text-center">
                        {stations.map((station) => (
                            <li key={station.id} className="flex items-center">
                                <div className="h-2 w-6 rounded-full"></div>
                                <Link
                                    href={createLightRailLink({
                                        stationId: station.id,
                                        locale,
                                    })}
                                    prefetch={false}
                                    className="mr-6 block w-full px-4 py-2 hover:font-semibold hover:underline"
                                >
                                    {t(`light-rail.stations.${station.id}`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Surface>
            </div>

            <div className="container mx-auto">
                <Link href={`/${locale}/bus/kmb`} className={buttonVariants()}>
                    KMB <Chip>Beta</Chip>
                </Link>
            </div>
        </div>
    );
};

export default IndexPage;
