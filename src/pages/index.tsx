import React, { Fragment } from "react";
import { Button } from "ui";
import { useTranslate } from "i18n/hooks/useTranslate";
import { translate } from "locales";
import lines from "data/lines.json";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { jc } from "utils/joinClasses";

const IndexPage = () => {
    const t = useTranslate(translate);
    return (
        <div className="mx-2 mt-6 space-y-6">
            <Tab.Group>
                <div className="flex justify-center">
                    <Tab.List className="justify-center gap-1 tabs tabs-boxed">
                        {Object.keys(lines).map((line) => (
                            <Tab key={line}>
                                {({ selected }) => (
                                    <div
                                        className={jc([
                                            "tab rounded-md",
                                            selected && "text-base-100",
                                        ])}
                                        style={{
                                            backgroundColor: selected
                                                ? lines[line].colour
                                                : `${lines[line].colour}${
                                                      selected ? "FF" : "2F"
                                                  }`,
                                        }}
                                    >
                                        {t(`mtr.lines.${line}`)}
                                    </div>
                                )}
                            </Tab>
                        ))}
                    </Tab.List>
                </div>
                <Tab.Panels>
                    {Object.keys(lines).map((line) => (
                        <Tab.Panel key={line} className="flex justify-center">
                            <ul className="w-full max-w-xl p-2 text-center bg-base-200 menu rounded-box">
                                {lines[line].stations.map((station: string) => (
                                    <li key={`${line}-${station}`}>
                                        <Link
                                            href={`/realtime/${line}/${station}`}
                                        >
                                            <a className="block w-full px-4 py-2 hover:underline hover:font-semibold">
                                                {t(`mtr.stations.${station}`)}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default IndexPage;
