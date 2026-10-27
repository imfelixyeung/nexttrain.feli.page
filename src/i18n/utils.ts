"use client";

import { capitalCase } from "change-case";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import type { LocalisedString as LocalisedStringType } from "./types";

const noTransform = (input: string) => input;

export const LocalisedString = ({
    string,
    transform = "none",
}: {
    string: LocalisedStringType;
    transform?: "none" | "capital";
}) => {
    const transformFn = useMemo(() => {
        if (transform === "capital") return capitalCase;

        transform satisfies "none";
        return noTransform;
    }, [transform]);
    const locale = useLocale();
    return transformFn(string[locale]);
};
