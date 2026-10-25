"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider
            // https://github.com/pacocoursey/next-themes/issues/387
            scriptProps={{ type: "application/json" }}
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    );
};
