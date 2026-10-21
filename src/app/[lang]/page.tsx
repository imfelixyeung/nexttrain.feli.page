import { Surface, Tabs } from "@heroui/react";
import Link from "next/link";
import { lang } from "next/root-params";
import { type Line, lineIds, lines } from "@/data/lines";
import { getDictionary } from "@/i18n/dictionary";
import { createRealtimeLink } from "@/utils/createRealtimeLink";

const IndexPage = async () => {
    const t = await getDictionary();
    const locale = await lang();

    return (
        <div className="mx-2 mt-6 space-y-6">
            <Tabs>
                <Tabs.ListContainer>
                    <Tabs.List>
                        {lineIds.map((line: Line) => (
                            <Tabs.Tab key={line} id={line}>
                                <Tabs.Indicator
                                    style={{
                                        borderColor: lines[line].colour,
                                    }}
                                />
                                {t(`mtr.lines.${line}`)}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs.ListContainer>
                {lineIds.map((line) => (
                    <Tabs.Panel
                        id={line}
                        key={line}
                        className="mx-auto max-w-xl"
                    >
                        <Surface variant="secondary">
                            <ul className="w-full max-w-xl p-2 text-center bg-base-200 menu rounded-box">
                                {lines[line].stations.map((station: string) => (
                                    <li key={`${line}-${station}`}>
                                        <Link
                                            href={createRealtimeLink(
                                                line,
                                                station,
                                                locale,
                                            )}
                                            className="block w-full px-4 py-2 hover:underline hover:font-semibold"
                                        >
                                            {t(`mtr.stations.${station}`)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Surface>
                    </Tabs.Panel>
                ))}
            </Tabs>
        </div>
    );
};

export default IndexPage;
