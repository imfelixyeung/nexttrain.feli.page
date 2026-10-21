import type { GetStaticPaths, Metadata } from "next";
import LineBadge from "@/components/LineBadge";
import LineStationPath from "@/components/LineStationPath";
import { assertValidLine, lineIds, lines } from "@/data/lines";
import { getDictionary } from "@/i18n/dictionary";
import { availableLocales } from "@/locales";
import { LineStationData } from "./page.client";

export const generateMetadata = async (
    props: PageProps<"/[lang]/realtime/[line]/[station]">,
) => {
    const { line, station } = await props.params;
    const t = await getDictionary();

    const stationStr = t(`mtr.stations.${station}`);
    const lineStr = t(`mtr.lines.${line}`);

    return {
        title: `${stationStr} - ${lineStr} | Next Train`,
    } satisfies Metadata;
};

const LineStationPage = async ({
    params,
}: PageProps<"/[lang]/realtime/[line]/[station]">) => {
    const { line, station } = await params;
    assertValidLine(line);

    return (
        <div>
            <div className="flex justify-center mt-8">
                <LineBadge line={line} />
            </div>
            <div className="my-6">
                <LineStationPath {...{ line, station }} />
            </div>

            <LineStationData line={line} station={station} />

            {/* <details>
                <summary>Raw Data (Click to View)</summary>
                <pre className="text-xs">{JSON.stringify(data, null, 4)}</pre>
            </details> */}
        </div>
    );
};

export default LineStationPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = lineIds
        .flatMap((line) =>
            lines[line].stations.map((station: string) =>
                availableLocales.map((locale) => ({
                    params: { line, station },
                    locale,
                })),
            ),
        )
        .flat();

    return {
        paths,
        fallback: false,
    };
};
