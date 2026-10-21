import type { Metadata } from "next";
import { availableLocales } from "@/locales";
import "@/styles/globals.css";
import AppBar from "@/components/AppBar";
import { Providers } from "./providers";

export const instant = false;

export async function generateStaticParams() {
    return availableLocales.map((lang) => ({ lang }));
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
        <html lang={lang}>
            <body className="font-inter">
                <AppBar />
                <Providers>
                    <div className="mb-16 text-base-content">{children}</div>
                </Providers>
            </body>
        </html>
    );
};

export default Layout;
