import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { sleep } from "workflow";
import { env } from "@/env";

const mirrors = [
    {
        source: "https://data.etabus.gov.hk/v1/transport/kmb/route",
        destination:
            "data.gov.hk/mirror/data.etabus.gov.hk/v1/transport/kmb/route",
    },
    {
        source: "https://data.etabus.gov.hk/v1/transport/kmb/stop",
        destination:
            "data.gov.hk/mirror/data.etabus.gov.hk/v1/transport/kmb/stop",
    },
    {
        source: "https://data.etabus.gov.hk/v1/transport/kmb/route-stop",
        destination:
            "data.gov.hk/mirror/data.etabus.gov.hk/v1/transport/kmb/route-stop",
    },
];

const syncFile = async (key: string, data: string) => {
    "use step";

    const s3 = new S3Client({
        region: env.S3_REGION,
        endpoint: env.S3_ENDPOINT,
        credentials: {
            accessKeyId: env.S3_ACCESS_KEY_ID,
            secretAccessKey: env.S3_SECRET_ACCESS_KEY,
        },
    });

    const command = new PutObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: key,
        Body: data,
    });

    await s3.send(command);
};

const syncMirror = async (
    mirror: (typeof mirrors)[number] & { status: string },
) => {
    "use step";
    const { source, destination } = mirror;

    const response = await fetch(source);
    if (!response.ok) {
        mirror.status = "error";
        return;
    }

    const data = await response.text();

    try {
        await syncFile(destination, data);
        mirror.status = "success";
    } catch (error) {
        console.error(`Failed to upload ${destination}:`, error);
        mirror.status = "error";
    }
};

export const sync = async () => {
    "use workflow";
    const statuses = mirrors.map((mirror) => ({
        ...mirror,
        status: "pending",
    }));

    for (const mirror of statuses) {
        await syncMirror(mirror);
        await sleep("15s");
    }

    return statuses;
};
