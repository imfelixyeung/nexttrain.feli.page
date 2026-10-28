import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        CRON_SECRET: z.string().min(1).nullish(),
        S3_ACCESS_KEY_ID: z.string().min(1),
        S3_BUCKET: z.string().min(1),
        S3_ENDPOINT: z.url(),
        S3_REGION: z.string().min(1),
        S3_SECRET_ACCESS_KEY: z.string().min(1),
    },
    runtimeEnv: {
        CRON_SECRET: process.env.CRON_SECRET,
        S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
        S3_BUCKET: process.env.S3_BUCKET,
        S3_ENDPOINT: process.env.S3_ENDPOINT,
        S3_REGION: process.env.S3_REGION,
        S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    },
    emptyStringAsUndefined: true,
});
