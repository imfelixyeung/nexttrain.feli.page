"use client";

import { differenceInMinutes } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const calculate = (time: Date) => differenceInMinutes(time, new Date());

const DistanceToNow = ({ time }: { time: Date }) => {
    const t = useTranslations();
    const [minutes, setMinutes] = useState(() => calculate(time));

    useEffect(() => {
        const interval = setInterval(() => {
            setMinutes(calculate(time));
        }, 1_000);
        return () => clearInterval(interval);
    }, [time]);

    return (
        <div className="inline-block">
            <span className="text-xl font-bold">{minutes}</span>{" "}
            <span className="text-xl">{t("time.mins")}</span>
        </div>
    );
};

export default DistanceToNow;
