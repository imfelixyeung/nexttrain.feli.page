import { useRouter } from "next/router";
import { TranslateFunction } from "../index";

export const useTranslate = (translateFunction: TranslateFunction) => {
    const { locale } = useRouter();
    return (key: string) => translateFunction(key, locale);
};
