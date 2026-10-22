import type { GetStaticPaths, Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LineBadge from "@/components/LineBadge";
import LineStationPath from "@/components/LineStationPath";
import { assertValidLine, lineIds, lines } from "@/data/mtr";
import { routing } from "@/i18n/routing";
import { LineStationData } from "./page.client";

export const generateMetadata = async (
    props: PageProps<"/[lang]/mtr/line/[line]/station/[station]/realtime">,
) => {
    const { line, station } = await props.params;
    const t = await getTranslations();

    // @ts-expect-error FIXME
    const stationStr = t(`mtr.stations.${station}`);
    // @ts-expect-error FIXME
    const lineStr = t(`mtr.lines.${line}`);

    return {
        title: `${stationStr} - ${lineStr} | Next Train`,
    } satisfies Metadata;
};

const LineStationPage = async ({
    params,
}: PageProps<"/[lang]/mtr/line/[line]/station/[station]/realtime">) => {
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
                routing.locales.map((locale) => ({
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
