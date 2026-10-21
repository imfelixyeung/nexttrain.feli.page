import Head from "next/head";
import React, { FC } from "react";
import AppBar from "./AppBar";

const appInfo = {
    appIcon: "https://feli.page/assets/images/icons/nexttrain.png",
    appName: "Next Train",
};

const Layout: FC = ({ children }) => {
    return (
        <>
            <Head>
                <title>Next Train</title>
                <link rel="icon" href={appInfo.appIcon} />
                <link rel="apple-touch-icon" href={appInfo.appIcon} />
                <meta
                    name="apple-mobile-web-app-title"
                    content={appInfo.appName}
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black"
                />
            </Head>
            <AppBar />
            <div className="mb-16 text-base-content">{children}</div>
        </>
    );
};

export default Layout;
