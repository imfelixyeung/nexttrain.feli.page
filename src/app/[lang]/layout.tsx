import type { Metadata } from "next";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import AppBar from "@/components/AppBar";
import { routing } from "@/i18n/routing";
import { Providers } from "./providers";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ lang: locale }));
}

const appInfo = {
    appIcon: "https://feli.page/assets/images/icons/nexttrain.png",
    appName: "Next Train",
};

export const metadata: Metadata = {
    title: appInfo.appName,
    icons: {
        icon: appInfo.appIcon,
        apple: appInfo.appIcon,
    },
    appleWebApp: {
        title: appInfo.appName,
        capable: true,
        statusBarStyle: "black",
    },
};

const Layout = async ({ children, params }: LayoutProps<"/[lang]">) => {
    const { lang } = await params;
    return (
        <html lang={lang} suppressHydrationWarning>
            <body className="font-inter">
                <NextIntlClientProvider>
                    <AppBar />
                    <Providers>
                        <div className="text-base-content mb-16">
                            {children}
                        </div>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default Layout;
