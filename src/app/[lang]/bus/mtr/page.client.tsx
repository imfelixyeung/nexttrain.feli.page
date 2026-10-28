"use client";

import { useQuery } from "@tanstack/react-query";
import { mtrQueries } from "@/api/bus/mtr/queries";
import { MTRBusRoute } from "@/components/mtr/bus/route";

export const RouteList = () => {
    const { data: routes } = useQuery(mtrQueries.routes());
    if (!routes) return null;

    return (
        <>
            {routes.map((route) => (
                <div key={route.ref}>
                    <ul>
                        <li>
                            <MTRBusRoute route={route} />
                        </li>
                    </ul>
                </div>
            ))}
        </>
    );
};
