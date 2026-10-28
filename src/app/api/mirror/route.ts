/**
 * This script mirrors infrequently changed API routes
 * from data.gov.hk to cdn.transit.feli.page
 */

import { type NextRequest, NextResponse } from "next/server";
import { start } from "workflow/api";
import { create401, verifyCronSecret } from "@/utils/cron";
import { sync } from "./workflow";

export const GET = async (request: NextRequest) => {
    const valid = await verifyCronSecret(request);
    if (!valid) return create401();

    await start(sync);

    return NextResponse.json({
        message: "mirror job queued",
    });
};
