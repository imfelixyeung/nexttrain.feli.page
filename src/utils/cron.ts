import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

export const verifyCronSecret = async (request: NextRequest) => {
    const authHeader = request.headers.get("authorization");
    const cronSecret = env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) return false;

    return true;
};

export const create401 = () => {
    return new NextResponse("Unauthorized", {
        status: 401,
    });
};
