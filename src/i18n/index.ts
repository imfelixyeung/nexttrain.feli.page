/* eslint-disable @typescript-eslint/no-explicit-any */
const getDottedKeyFromObject = (
    object: {
        [key: string]: unknown;
    },
    key: string,
): string => {
    const keyChunks = key.split(".");
    // biome-ignore lint/suspicious/noExplicitAny: FIXME
    let data: any = object;
    for (const chunk of keyChunks) {
        if (data === undefined || data === null) break;
        data = data[chunk] ?? null;
    }
    return (data ?? key) as string;
};

export interface LocaleLookup {
    [key: string]: { [key: string]: unknown };
}

export interface CreateTranslateOptions {
    defaultLocale: string;
    localeLookup: LocaleLookup;
}

export type TranslateFunction = (key: string, locale?: string) => string;

export const createTranslate = ({
    localeLookup,
    defaultLocale,
}: CreateTranslateOptions) => {
    const translate = (key: string, locale: string = defaultLocale): string => {
        const localeObj = localeLookup[locale];
        if (!localeObj) return key;
        return getDottedKeyFromObject(localeObj, key);
    };
    return translate;
};
