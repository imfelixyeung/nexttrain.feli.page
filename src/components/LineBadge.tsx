import type { FC } from "react";
import lines from "@/data/lines.json";
import { useTranslate } from "@/i18n/hooks/useTranslate";
import { translate } from "@/locales";

interface Props {
    line: string;
}

const LineBadge: FC<Props> = ({ line }) => {
    const t = useTranslate(translate);
    const colour = lines[line].colour;
    return (
        <div
            className="px-2 py-1 text-2xl font-black tracking-wider text-white bg-gray-800 rounded-lg"
            style={{ backgroundColor: colour }}
        >
            {t(`mtr.lines.${line}`)}
        </div>
    );
};

export default LineBadge;
