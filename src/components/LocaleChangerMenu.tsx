import { Button, Dropdown } from "@heroui/react";
import { LanguagesIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { availableLocales, defaultLocale } from "@/locales";

const LocaleChangerMenu = () => {
    const router = useRouter();
    let { lang } = useParams();
    lang = lang?.toString();

    const handleLocaleChange = async (locale: string) => {
        router.push(`/${locale}`);
    };

    return (
        <div>
            <Dropdown>
                <Button aria-label="Locale" variant="ghost" isIconOnly>
                    <LanguagesIcon size={16} className="size-5" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu
                        selectedKeys={[lang ?? defaultLocale]}
                        onAction={(locale) =>
                            void handleLocaleChange(locale.toString())
                        }
                    >
                        {availableLocales.map((locale) => (
                            <Dropdown.Item
                                id={locale}
                                textValue={locale}
                                key={locale}
                            >
                                <Dropdown.ItemIndicator />
                                {locale}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </div>
    );
};

export default LocaleChangerMenu;
