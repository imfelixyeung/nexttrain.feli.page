"use client";

import { Chip, Typography } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Fragment } from "react/jsx-runtime";
import { getLightRailStationData } from "@/api/light-rail";
import type { Station } from "@/data/light-rail";
import { LocalisedString } from "@/i18n/utils";

export const Schedules = ({ station }: { station: Station }) => {
    const t = useTranslations();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["getLightRailStationData", station.id],
        queryFn: () => getLightRailStationData(station.id),
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return t("common.loading");
    if (isError || !data) return t("error.unknown");

    return (
        <div className="mt-3 flex flex-col gap-8">
            {data.platform_list.map((platform) => {
                const { platform_id, route_list } = platform;
                if (!route_list) return <Fragment key={platform_id} />;
                return (
                    <div key={platform_id} className="">
                        <Typography.Heading level={2}>
                            {t("common.platform-number", {
                                platform: platform.platform_id,
                            })}
                        </Typography.Heading>
                        <div className="mt-3 flex flex-col gap-2">
                            {route_list.map((route, index) => {
                                const {
                                    train_length,
                                    destination,
                                    time,
                                    route_no,
                                } = route;
                                return (
                                    <div
                                        // biome-ignore lint/suspicious/noArrayIndexKey: no valid unique keys
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex grow items-center gap-3">
                                            <div className="flex h-5 w-[5ch] items-center justify-center rounded-full border-2 border-blue-600 px-2 text-xs font-bold ring ring-black">
                                                {route_no}
                                            </div>
                                            <div className="text-lg">
                                                {t("prepositions.to")}{" "}
                                                <LocalisedString
                                                    string={destination}
                                                />
                                            </div>
                                            <Chip size="sm">
                                                {t("common.n-car", {
                                                    size: train_length,
                                                })}
                                            </Chip>
                                        </div>

                                        <div className="text-lg">
                                            <LocalisedString string={time} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
