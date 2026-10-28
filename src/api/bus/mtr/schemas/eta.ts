import { z } from "zod";

export const etaSchema = z.object({
    appRefreshTimeInSecond: z.string(),
    busStop: z.array(
        z.object({
            bus: z.array(
                z.object({
                    arrivalTimeInSecond: z.string(),
                    arrivalTimeText: z.string(),
                    busId: z.string(),
                    busLocation: z.object({
                        latitude: z.number(),
                        longitude: z.number(),
                    }),
                    busRemark: z.null(),
                    departureTimeInSecond: z.string(),
                    departureTimeText: z.string(),
                    isDelayed: z.string(),
                    isScheduled: z.string(),
                    lineRef: z.string(),
                }),
            ),
            busIcon: z.string().nullable(),
            busStopId: z.string(),
            busStopRemark: z.null(),
            busStopStatus: z.null(),
            busStopStatusRemarkContent: z.null(),
            busStopStatusRemarkTitle: z.null(),
            busStopStatusTime: z.null(),
            isSuspended: z.string(),
        }),
    ),
    caseNumber: z.number(),
    caseNumberDetail: z.string(),
    footerRemarks: z.string(),
    routeColour: z.string(),
    routeName: z.string(),
    routeStatus: z.string(),
    routeStatusColour: z.string(),
    routeStatusRemarkContent: z.null(),
    routeStatusRemarkFooterRemark: z.string(),
    routeStatusRemarkTitle: z.null(),
    routeStatusTime: z.string(),
    status: z.string(),
});
