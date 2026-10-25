import { useTranslations } from "next-intl";
import type { FC } from "react";

interface Props {
    ttnt: string;
}

const TTNTMessage: FC<Props> = ({ ttnt }) => {
    const t = useTranslations();

    return ttnt === "0" ? (
        <div>
            <span className="text-xl font-bold">{t("transit.departing")}</span>
        </div>
    ) : ttnt === "1" ? (
        <div>
            <span className="text-xl font-bold">{t("transit.arriving")}</span>
        </div>
    ) : (
        <div>
            <span className="text-xl font-bold">{ttnt}</span>{" "}
            <span className="text-xl">{t("time.mins")}</span>
        </div>
    );
};

export default TTNTMessage;
