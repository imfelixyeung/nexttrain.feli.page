import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Link from "next/link";
import { lang } from "next/root-params";
import lines from "@/data/lines.json";
import { getDictionary } from "@/i18n/dictionary";
import { jc } from "@/utils/joinClasses";

const IndexPage = async () => {
    const t = await getDictionary();
    const locale = await lang();

    return (
        <div className="mx-2 mt-6 space-y-6">
            <TabGroup>
                <div className="flex justify-center">
                    <TabList className="justify-center gap-1 tabs tabs-boxed">
                        {Object.keys(lines).map((line) => (
                            <Tab key={line}>
                                <div
                                    className={jc([
                                        "tab rounded-md data-selected:opacity-10 data-selected:text-base-100",
                                    ])}
                                    style={{
                                        backgroundColor: lines[line].colour,
                                    }}
                                >
                                    {t(`mtr.lines.${line}`)}
                                </div>
                            </Tab>
                        ))}
                    </TabList>
                </div>
                <TabPanels>
                    {Object.keys(lines).map((line) => (
                        <TabPanel key={line} className="flex justify-center">
                            <ul className="w-full max-w-xl p-2 text-center bg-base-200 menu rounded-box">
                                {lines[line].stations.map((station: string) => (
                                    <li key={`${line}-${station}`}>
                                        <Link
                                            href={`/${locale}/realtime/${line}/${station}`}
                                            className="block w-full px-4 py-2 hover:underline hover:font-semibold"
                                        >
                                            {t(`mtr.stations.${station}`)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </div>
    );
};

export default IndexPage;
