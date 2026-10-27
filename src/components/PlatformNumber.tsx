import type { FC } from "react";
import { type Line, lines } from "@/data/mtr";

interface Props {
    line: Line;
    platform: string;
    variant?: "default" | "small";
}

const PlatformNumber: FC<Props> = ({ line, platform, variant = "default" }) => {
    const colour = lines[line].colour;
    if (variant === "small") {
        return (
            <div
                className="inline-block h-6 w-6 rounded-full text-white"
                style={{ backgroundColor: colour }}
            >
                <span className="grid h-full w-full place-items-center text-sm">
                    {platform}
                </span>
            </div>
        );
    }
    return (
        <div
            className="inline-block h-8 w-8 rounded-full text-white"
            style={{ backgroundColor: colour }}
        >
            <span className="grid h-full w-full place-items-center text-base">
                {platform}
            </span>
        </div>
    );
};

export default PlatformNumber;
