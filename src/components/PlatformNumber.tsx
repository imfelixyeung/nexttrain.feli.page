import type { FC } from "react";
import { type Line, lines } from "@/data/lines";

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
                className="inline-block w-6 h-6 text-white rounded-full"
                style={{ backgroundColor: colour }}
            >
                <span className="grid w-full h-full text-sm place-items-center">
                    {platform}
                </span>
            </div>
        );
    }
    return (
        <div
            className="inline-block w-8 h-8 text-white rounded-full"
            style={{ backgroundColor: colour }}
        >
            <span className="grid w-full h-full text-base place-items-center">
                {platform}
            </span>
        </div>
    );
};

export default PlatformNumber;
