import { useTranslate } from "i18n/hooks/useTranslate";
import { translate } from "locales";
import React, { FC } from "react";

interface Props {
    station: string;
    line: string;
}

const ToTerminal: FC<Props> = ({ line, station }) => {
    const t = useTranslate(translate);
    return (
        <div className="flex justify-center text-2xl font-semibold underline">
            {t("prepositions.to")} {t(`mtr.stations.${station}`)}
        </div>
    );
};

export default ToTerminal;
