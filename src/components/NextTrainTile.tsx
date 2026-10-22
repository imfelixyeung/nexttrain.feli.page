import moment from "moment";
import Link from "next/link";
import type { FC } from "react";
import type { Direction } from "@/api/interfaces";
import type { Line } from "@/data/lines";
import { translate } from "@/locales";
import { createRealtimeLink } from "@/utils/createRealtimeLink";
import PlatformNumber from "./PlatformNumber";
import TTNTMessage from "./TTNTMessage";

interface Props {
    line: Line;
    data: Direction;
}

const NextTrainTile: FC<Props> = ({ data, line }) => {
    const { dest, plat, time, ttnt } = data;

    const t = translate;
    const momentTime = moment(time);
    const formattedDepartureTime = momentTime.format("HH:mm");
    const formattedArrivalTime = momentTime
        .subtract(1, "minute")
        .format("HH:mm");

    return (
        <div className="flex items-center flex-grow max-w-lg">
            <div className="grid mx-3 place-items-center">
                <PlatformNumber platform={plat} line={line} />
            </div>
            <div className="flex flex-col flex-grow">
                <div className="flex flex-col">
                    {/* <div>{t(`mtr.lines.${line}`)}</div> */}
                    <div>
                        <Link href={createRealtimeLink(line, dest)}>
                            {t("prepositions.to")} {t(`mtr.stations.${dest}`)}
                        </Link>
                    </div>
                </div>
                <div className="text-sm text-base-content">
                    {ttnt === "0" ? (
                        <div>Departing at {formattedDepartureTime}</div>
                    ) : (
                        <div>
                            {ttnt === "1" ? "Arriving" : "Arrivies"} at{" "}
                            {formattedArrivalTime}
                        </div>
                    )}
                </div>
            </div>
            <div className="mx-3">
                <TTNTMessage {...{ ttnt }} />
            </div>
        </div>
    );
};

export default NextTrainTile;
