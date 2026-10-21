import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import lines from "data/lines.json";
import { useTranslate } from "i18n/hooks/useTranslate";
import { availableLocales, translate } from "locales";
import { useQuery } from "react-query";
import { createURL, normaliseJson } from "api/nexttrain";
import Link from "next/link";
import { Direction } from "api/interfaces";
import PlatformNumber from "components/PlatformNumber";
import NextTrainTile from "components/NextTrainTile";
import LineBadge from "components/LineBadge";
import LineStationPath from "components/LineStationPath";
import ToTerminal from "components/ToTerminal";
import { NextSeo } from "next-seo";

interface Props {
    line: string;
    station: string;
}

const LineStationPage: NextPage<Props> = ({ line, station }) => {
    const t = useTranslate(translate);
    const { isLoading, error, data, status } = useQuery(
        `realtime_${line}-${station}`,
        () =>
            fetch(createURL({ line, station }))
                .then((res) => res.json())
                .then(normaliseJson),
        {
            refetchInterval: 5000,
            refetchIntervalInBackground: true,
            refetchOnWindowFocus: false,
        }
    );

    const renderDirection = (destination: string, data: Direction[]) => {
        return (
            <div className="flex-grow space-y-4">
                <ToTerminal line={line} station={destination} />
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

    const hasDownData = data && data.data.DOWN && data.data.DOWN.length != 0;
    const hasUpData = data && data.data.UP && data.data.UP.length != 0;

    const stationStr = t(`mtr.stations.${station}`);
    const lineStr = t(`mtr.lines.${line}`);
    return (
        <div>
            <NextSeo title={`${stationStr} - ${lineStr} | Next Train`} />
            <div className="flex justify-center mt-8">
                <LineBadge line={line} />
            </div>
            <div className="my-6">
                <LineStationPath {...{ line, station }} />
            </div>

            {data && (
                <div
                    className={
                        hasDownData && hasUpData
                            ? "space-y-8 lg:space-y-0 justify-center grid-cols-2 lg:grid"
                            : ""
                    }
                >
                    {hasDownData &&
                        renderDirection(
                            lines[line].terminals.DOWN,
                            data.data.DOWN
                        )}
                    {hasUpData &&
                        renderDirection(lines[line].terminals.UP, data.data.UP)}
                </div>
            )}
            {isLoading && <div className="text-center">Loading...</div>}
            {!isLoading && !hasDownData && !hasUpData && (
                <div className="text-center">No data available</div>
            )}

            {/* <details>
                <summary>Raw Data (Click to View)</summary>
                <pre className="text-xs">{JSON.stringify(data, null, 4)}</pre>
            </details> */}
        </div>
    );
};

export default LineStationPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = Object.keys(lines)
        .map((line) =>
            lines[line].stations.map((station: string) =>
                availableLocales.map((locale) => ({
                    params: { line, station },
                    locale,
                }))
            )
        )
        .flat()
        .flat();

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { line, station } = params;
    return {
        props: { line, station } as Props,
    };
};
