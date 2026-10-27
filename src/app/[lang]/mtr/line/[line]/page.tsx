import { Surface } from "@heroui/react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import LineBadge from "@/components/LineBadge";
import { assertValidLine, lines } from "@/data/mtr";
import { routing } from "@/i18n/routing";
import { createRealtimeLink } from "@/utils/urls";

export function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
        Object.keys(lines).map((line) => ({ lang: locale, line })),
    );
}

const IndexPage = async ({ params }: PageProps<"/[lang]/mtr/line/[line]">) => {
    const { line } = await params;
    assertValidLine(line);
    const t = await getTranslations();
    const locale = await getLocale();

    return (
        <div className="mx-2 mt-6 space-y-6">
            <div className="mt-8 flex justify-center">
                <LineBadge line={line} />
            </div>
            <Surface variant="secondary" className="mx-auto w-full max-w-xl">
                <ul className="bg-base-200 menu rounded-box p-2 text-center">
                    {lines[line].stations.map((station) => (
                        <li key={`${line}-${station}`}>
                            <Link
                                href={createRealtimeLink({
                                    line,
                                    station,
                                    locale,
                                })}
                                className="block w-full px-4 py-2 hover:font-semibold hover:underline"
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
