"use client";

import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

const persister = createAsyncStoragePersister({
    storage: typeof window === "object" ? window.localStorage : undefined,
});
const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider
            // https://github.com/pacocoursey/next-themes/issues/387
            scriptProps={{ type: "application/json" }}
        >
            <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{ persister }}
                onSuccess={() => {
                    queryClient.resumePausedMutations().then(() => {
                        queryClient.invalidateQueries();
                    });
                }}
            >
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </PersistQueryClientProvider>
        </ThemeProvider>
    );
};
