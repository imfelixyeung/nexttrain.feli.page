import Layout from "components/Layout";
import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "styles/globals.css";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    );
};

export default MyApp;
