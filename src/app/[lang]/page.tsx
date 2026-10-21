import { Surface } from "@heroui/react";
import Link from "next/link";
import { lang } from "next/root-params";
import { lineIds, lines } from "@/data/lines";
import { getDictionary } from "@/i18n/dictionary";
import { createLineLink } from "@/utils/createRealtimeLink";

const IndexPage = async () => {
    const t = await getDictionary();
    const locale = await lang();

    return (
        <div className="mx-2 mt-6 space-y-6">
            <Surface variant="secondary" className="w-full max-w-xl mx-auto">
                <ul className="p-2 text-center bg-base-200 menu rounded-box">
                    {lineIds.map((line: string) => (
                        <li key={`${line}`} className="flex items-center">
                            <div
                                style={{ backgroundColor: lines[line].colour }}
                                className="h-2 w-6 rounded-full"
                            ></div>
                            <Link
                                href={createLineLink(line, locale)}
                                className="block w-full px-4 py-2 hover:underline hover:font-semibold mr-6"
                            >
                                {t(`mtr.lines.${line}`)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Surface>
        </div>
    );
};

export default IndexPage;
