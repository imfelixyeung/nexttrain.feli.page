import React from "react";
import { availableLocales, defaultLocale } from "locales";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/router";
import { HiOutlineCheck, HiOutlineTranslate } from "react-icons/hi";

const LocaleChangerMenu = () => {
    const router = useRouter();

    const handleLocaleChange = async (locale: string) => {
        await router.push(
            { pathname: router.pathname, query: router.query },
            {},
            { locale }
        );
    };

    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className="text-2xl btn btn-square btn-ghost">
                    <HiOutlineTranslate />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                    className="min-w-[10rem] bg-white py-2 shadow-lg rounded-lg"
                    sideOffset={4}
                >
                    <DropdownMenu.DropdownMenuRadioGroup
                        value={router.locale ?? defaultLocale}
                        onValueChange={handleLocaleChange}
                    >
                        {availableLocales.map((locale) => (
                            <DropdownMenu.DropdownMenuRadioItem
                                value={locale}
                                key={locale}
                                disabled={
                                    locale === (router.locale ?? defaultLocale)
                                }
                                className="relative flex items-center py-1 pl-6 pr-2 cursor-pointer hover:border-none hover:bg-gray-100 radix-disabled:cursor-not-allowed"
                            >
                                <DropdownMenu.DropdownMenuItemIndicator className="absolute left-0 flex items-center justify-center w-6 py-1 text-lg">
                                    <HiOutlineCheck />
                                </DropdownMenu.DropdownMenuItemIndicator>
                                {locale}
                            </DropdownMenu.DropdownMenuRadioItem>
                        ))}
                    </DropdownMenu.DropdownMenuRadioGroup>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    );
};

export default LocaleChangerMenu;
