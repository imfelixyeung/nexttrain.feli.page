import { getTranslations } from "next-intl/server";
import { type Line, lines } from "@/data/mtr";

interface Props {
    line: Line;
}

const LineBadge = async ({ line }: Props) => {
    const t = await getTranslations();
    const colour = lines[line].colour;
    return (
        <div
            className="rounded-lg bg-gray-800 px-2 py-1 text-2xl font-black tracking-wider text-white"
            style={{ backgroundColor: colour }}
        >
            {t(`mtr.lines.${line}`)}
        </div>
    );
};

export default LineBadge;
