import type { Route } from "@/api/bus/kmb/schemas/route";
import { LocalisedString } from "@/i18n/utils";
import { KMBRouteBadge } from "./route-badge";

export const KMBRoute = ({ route: r }: { route: Route }) => {
    const { route, destination } = r;
    return (
        <div className="flex items-center gap-2">
            <KMBRouteBadge route={route} />
            <span className="capitalize font-medium">
                <LocalisedString string={destination} transform="capital" />
            </span>
        </div>
    );
};
