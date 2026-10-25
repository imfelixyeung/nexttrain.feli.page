"use client";

import { useLocale } from "next-intl";
import type { LocalisedString as LocalisedStringType } from "./types";

export const LocalisedString = ({
    string,
}: {
    string: LocalisedStringType;
}) => {
    const locale = useLocale();
    return string[locale];
};
