import { Surface } from "@heroui/react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import LineBadge from "@/components/LineBadge";
import { assertValidLine, lines } from "@/data/mtr";
import { createRealtimeLink } from "@/utils/urls";

const IndexPage = async ({ params }: PageProps<"/[lang]/mtr/line/[line]">) => {
    const { line } = await params;
    assertValidLine(line);
    const t = await getTranslations();
    const locale = await getLocale();

    return (
        <div className="mx-2 mt-6 space-y-6">
            <div className="flex justify-center mt-8">
                <LineBadge line={line} />
            </div>
            <Surface variant="secondary" className="w-full max-w-xl mx-auto">
                <ul className="p-2 text-center bg-base-200 menu rounded-box">
                    {lines[line].stations.map((station) => (
                        <li key={`${line}-${station}`}>
                            <Link
                                href={createRealtimeLink(line, station, locale)}
                                className="block w-full px-4 py-2 hover:underline hover:font-semibold"
                            >
                                {t(`mtr.stations.${station}`)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Surface>
        </div>
    );
};

export default IndexPage;
