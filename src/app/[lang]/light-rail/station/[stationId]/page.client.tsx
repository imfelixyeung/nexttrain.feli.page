"use client";

import { Chip, Typography } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import { getLightRailStationData } from "@/api/light-rail";
import type { Station } from "@/data/light-rail";

export const Schedules = ({ station }: { station: Station }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["getLightRailStationData", station.id],
        queryFn: () => getLightRailStationData(station.id),
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return "Loading";
    if (isError || !data) return "Something went wrong...";

    return (
        <div className="flex flex-col gap-8 mt-3">
            {data.platform_list.map((platform) => {
                const { platform_id, route_list } = platform;
                if (!route_list) return <Fragment key={platform_id} />;
                return (
                    <div key={platform_id} className="">
                        <Typography.Heading level={2}>
                            Platform {platform.platform_id}
                        </Typography.Heading>
                        <div className="flex flex-col gap-2 mt-3">
                            {route_list.map((route, index) => {
                                const {
                                    train_length,
                                    dest_en,
                                    time_en,
                                    route_no,
                                } = route;
                                return (
                                    <div
                                        // biome-ignore lint/suspicious/noArrayIndexKey: no valid unique keys
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="grow flex gap-3 items-center">
                                            <div className="ring-black px-2 text-xs rounded-full ring border-blue-600 border-2 flex justify-center items-center h-5 font-bold w-[5ch]">
                                                {route_no}
                                            </div>
                                            <div className="text-lg">
                                                To {dest_en}
                                            </div>
                                            <Chip size="sm">
                                                {train_length}-car
                                            </Chip>
                                        </div>

                                        <div className="text-lg">{time_en}</div>
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
