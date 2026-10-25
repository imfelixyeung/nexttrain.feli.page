"use client";

import { buttonVariants, Surface } from "@heroui/react";
import { ArrowLeftIcon, TrainIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { createHomeLink } from "@/utils/urls";
import LocaleChangerMenu from "./LocaleChangerMenu";

const AppBar = () => {
    const pathname = usePathname();
    const atHome = pathname.lastIndexOf("/") === 0;
    const Icon = atHome ? TrainIcon : ArrowLeftIcon;
    const locale = useLocale();

    return (
        <Surface className="sticky inset-y-0 top-0 z-50 flex items-center border-b py-2 px-2">
            <div className="flex-none">
                <Link
                    href={createHomeLink({ locale })}
                    className={buttonVariants({ isIconOnly: true })}
                >
                    <Icon size={16} className="size-5" />
                </Link>
            </div>
            <div className="flex-1 pl-2">
                <Link
                    href={createHomeLink({ locale })}
                    className="text-lg font-bold"
                >
                    Next Train
                </Link>
            </div>
            <div className="flex-none">
                <LocaleChangerMenu />
            </div>
        </Surface>
    );
};

export default AppBar;
