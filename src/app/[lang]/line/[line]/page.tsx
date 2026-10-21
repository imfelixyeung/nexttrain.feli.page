import { Surface } from "@heroui/react";
import Link from "next/link";
import { lang } from "next/root-params";
import LineBadge from "@/components/LineBadge";
import { assertValidLine, lines } from "@/data/lines";
import { getDictionary } from "@/i18n/dictionary";
import { createRealtimeLink } from "@/utils/createRealtimeLink";

const IndexPage = async ({ params }: PageProps<"/[lang]/line/[line]">) => {
    const { line } = await params;
    assertValidLine(line);
    const t = await getDictionary();
    const locale = await lang();

    return (
        <div className="mx-2 mt-6 space-y-6">
            <div className="flex justify-center mt-8">
                <LineBadge line={line} />
            </div>
            <Surface variant="secondary" className="w-full max-w-xl mx-auto">
                <ul className="p-2 text-center bg-base-200 menu rounded-box">
                    {lines[line].stations.map((station: string) => (
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
