import Link from "next/link";
import type { FC } from "react";
import type { Line } from "@/data/lines";
import lines from "@/data/lines.json";
import { getDictionary } from "@/i18n/dictionary";
import { createRealtimeLink } from "@/utils/createRealtimeLink";

interface Props {
    line: Line;
    station: string;
}

const LineStationPath: FC<Props> = ({ line, station }) => {
    const colour = lines[line].colour;
    const indexOfStation = lines[line].stations.indexOf(station);

    const previousStation =
        indexOfStation != 0 ? lines[line].stations[indexOfStation - 1] : null;
    const nextStation =
        indexOfStation != lines[line].stations.length - 1
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
    const t = await getDictionary();

    if (!station) {
        return <div></div>;
    }

    const colour = lines[line].colour;
    const isFirstStation = station === lines[line].stations[0];
    const isLastStation =
        station === lines[line].stations[lines[line].stations.length - 1];

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={bold ? "font-bold line-clamp-1" : "line-clamp-1"}>
                <Link href={createRealtimeLink(line, station)}>
                    {t(`mtr.stations.${station}`)}
                </Link>
            </div>
            <div className="flex items-center w-full">
                <div
                    className="flex-grow h-2"
                    style={{
                        backgroundColor: isFirstStation ? undefined : colour,
                    }}
                ></div>
                <div
                    className="relative grid w-4 h-4 rounded-full place-items-center"
                    style={{ backgroundColor: colour }}
                >
                    <div
                        className={`absolute w-4 h-2 ${
                            isLastStation ? "rounded-r-full" : ""
                        } ${isFirstStation ? "rounded-l-full" : ""}`}
                        style={{ backgroundColor: colour }}
                    ></div>
                    <div className="absolute w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div
                    className="flex-grow h-2"
                    style={{
                        backgroundColor: isLastStation ? undefined : colour,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default LineStationPath;
