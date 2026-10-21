const getDottedKeyFromObject = (
    object: {
        [key: string]: any;
    },
    key: string
): string => {
    const keyChunks = key.split(".");
    var data: any = object;
    for (var chunk of keyChunks) {
        if (data === undefined || data === null) break;
        data = data[chunk] ?? null;
    }
    return (data ?? key) as string;
};

export interface LocaleLookup {
    [key: string]: { [key: string]: any };
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
