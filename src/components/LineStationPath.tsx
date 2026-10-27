import { cn } from "@heroui/styles";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import type { FC } from "react";
import { type Line, lines } from "@/data/mtr";
import { createRealtimeLink } from "@/utils/urls";

interface Props {
    line: Line;
    station: string;
}

const LineStationPath: FC<Props> = ({ line, station }) => {
    const indexOfStation = lines[line].stations.indexOf(station as never);

    const previousStation =
        indexOfStation !== 0 ? lines[line].stations[indexOfStation - 1] : null;
    const nextStation =
        indexOfStation !== lines[line].stations.length - 1
            ? lines[line].stations[indexOfStation + 1]
            : null;

    return (
        <div className="grid grid-cols-3">
            <LineStationPathPin line={line} station={previousStation} />
            <LineStationPathPin line={line} station={station} bold />
            <LineStationPathPin line={line} station={nextStation} />
        </div>
    );
};

interface LineStationPathPinProps {
    line: Line;
    station: string | null;
    bold?: boolean;
}

const LineStationPathPin: FC<LineStationPathPinProps> = async ({
    line,
    station,
    bold = false,
}) => {
    const locale = await getLocale();
    const t = await getTranslations();

    if (!station) {
        return <div></div>;
    }

    const colour = lines[line].colour;
    const isFirstStation = station === lines[line].stations[0];
    const isLastStation =
        station === lines[line].stations[lines[line].stations.length - 1];

    const otherLines = Object.entries(lines)
        .filter(
            ([l, { stations }]) =>
                l !== line && stations.find((s) => s === station),
        )
        .map(([line, meta]) => ({ line, ...meta }));

    return (
        <div className="flex flex-col items-center gap-1">
            <div className={cn(bold && "font-bold", "mb-2 line-clamp-1")}>
                <Link href={createRealtimeLink({ line, station, locale })}>
                    {
                        // @ts-expect-error FIXME
                        t(`mtr.stations.${station}`)
                    }
                </Link>
            </div>
            <div className="flex w-full items-center">
                <div
                    className="h-4 grow"
                    style={{
                        backgroundColor: isFirstStation ? undefined : colour,
                    }}
                ></div>
                <Link
                    key={line}
                    href={createRealtimeLink({ line, station, locale })}
                >
                    <div
                        className="relative grid h-8 w-8 place-items-center rounded-full"
                        style={{ backgroundColor: colour }}
                    >
                        <div
                            className={`absolute h-4 w-8 ${
                                isLastStation ? "rounded-r-full" : ""
                            } ${isFirstStation ? "rounded-l-full" : ""}`}
                            style={{ backgroundColor: colour }}
                        ></div>
                        <div className="absolute h-4 w-4 rounded-full bg-white"></div>
                    </div>
                </Link>
                <div
                    className="h-4 grow"
                    style={{
                        backgroundColor: isLastStation ? undefined : colour,
                    }}
                ></div>
            </div>
            {otherLines.map(({ line, colour }) => (
                <Link
                    key={line}
                    href={createRealtimeLink({ line, station, locale })}
                >
                    <div className="flex w-full items-center justify-center">
                        <div
                            className="relative grid h-8 w-8 place-items-center rounded-full"
                            style={{ backgroundColor: colour }}
                        >
                            <div className="absolute h-4 w-4 rounded-full bg-white"></div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default LineStationPath;
