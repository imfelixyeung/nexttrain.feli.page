import type { FC } from "react";
import { useTranslate } from "@/i18n/hooks/useTranslate";
import { translate } from "@/locales";

interface Props {
    ttnt: string;
}

const TTNTMessage: FC<Props> = ({ ttnt }) => {
    const t = useTranslate(translate);

    return ttnt == "0" ? (
        <div>
            <span className="text-xl font-bold">Departing</span>
        </div>
    ) : ttnt == "1" ? (
        <div>
            <span className="text-xl font-bold">Arriving</span>
        </div>
    ) : (
        <div>
            <span className="text-xl font-bold">{ttnt}</span>{" "}
            <span className="text-xl">{t("time.mins")}</span>
        </div>
    );
};

export default TTNTMessage;
