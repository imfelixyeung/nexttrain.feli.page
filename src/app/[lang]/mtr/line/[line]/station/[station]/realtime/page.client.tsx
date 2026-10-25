"use client";

import { useQuery } from "@tanstack/react-query";
import type { Direction } from "@/api/interfaces";
import { createURL, normaliseJson } from "@/api/nexttrain";
import NextTrainTile from "@/components/NextTrainTile";
import ToTerminal from "@/components/ToTerminal";
import { type Line, lines } from "@/data/mtr";
import { useTranslations } from "next-intl";

const LineStationDirection = ({
    line,
    destination,
    data,
}: {
    line: Line;
    destination: string;
    data: Direction[];
}) => {
    return (
        <div className="grow space-y-4">
            <ToTerminal station={destination} />
            <div className="space-y-3">
                {data.map((data) => {
                    return (
                        <div key={data.seq} className="flex justify-center">
                            <NextTrainTile {...{ data, line }} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const LineStationData = ({
    line,
    station,
}: {
    line: Line;
    station: string;
}) => {
    const t = useTranslations();
    const { isLoading, data } = useQuery({
        queryKey: ["realtime", line, station],
        queryFn: () =>
            fetch(createURL({ line, station }))
                .then((res) => res.json())
                .then(normaliseJson),
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
    });

    const hasDownData = data?.data.DOWN && data.data.DOWN.length !== 0;
    const hasUpData = data?.data.UP && data.data.UP.length !== 0;

    return (
        <>
            {data && (
                <div
                    className={
                        hasDownData && hasUpData
                            ? "space-y-8 lg:space-y-0 justify-center grid-cols-2 lg:grid"
                            : ""
                    }
                >
                    {hasDownData && (
                        <LineStationDirection
                            line={line}
                            destination={lines[line].terminals.DOWN}
                            data={data.data.DOWN}
                        />
                    )}
                    {hasUpData && (
                        <LineStationDirection
                            line={line}
                            destination={lines[line].terminals.UP}
                            data={data.data.UP}
                        />
                    )}
                </div>
            )}
            {isLoading && (
                <div className="text-center">{t("common.loading")}</div>
            )}
            {!isLoading && !hasDownData && !hasUpData && (
                <div className="text-center">No data available</div>
            )}
        </>
    );
};
