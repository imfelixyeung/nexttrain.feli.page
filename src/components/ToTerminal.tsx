import type { FC } from "react";
import { translate } from "@/locales";

interface Props {
    station: string;
    line: string;
}

const ToTerminal: FC<Props> = ({ line, station }) => {
    const t = translate;
    return (
        <div className="flex justify-center text-2xl font-semibold underline">
            {t("prepositions.to")} {t(`mtr.stations.${station}`)}
        </div>
    );
};

export default ToTerminal;
