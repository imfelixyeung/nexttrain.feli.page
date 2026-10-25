"use client";

import type { Selection } from "@heroui/react";
import { Button, Dropdown } from "@heroui/react";
import { LanguagesIcon } from "lucide-react";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LocaleChangerMenu = () => {
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const availableLocales = routing.locales;
    const t = useTranslations("i18n");

    const selected = useMemo(() => new Set([locale]), [locale]);

    const handleLocaleChange = async (selection: Selection) => {
        if (selection === "all") return;
        const [locale] = selection.values();
        if (!locale) return;
        router.replace(pathname, { locale: locale as Locale });
    };

    return (
        <div>
            <Dropdown>
                <Button aria-label="Locale" variant="ghost" isIconOnly>
                    <LanguagesIcon size={16} className="size-5" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu
                        selectionMode="single"
                        selectedKeys={selected}
                        onSelectionChange={handleLocaleChange}
                    >
                        {availableLocales.map((locale) => (
                            <Dropdown.Item
                                id={locale}
                                textValue={t(locale)}
                                key={locale}
                            >
                                <Dropdown.ItemIndicator />
                                {t(locale)}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </div>
    );
};

export default LocaleChangerMenu;
