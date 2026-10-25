export type Coordinates = {
    latitude: number;
    longitude: number;
};

const getDistanceMeters = (c1: Coordinates, c2: Coordinates): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6_371_000; // Earth's radius in meters

    const dLat = toRad(c2.latitude - c1.latitude);
    const dLon = toRad(c2.longitude - c1.longitude);
    const lat1 = toRad(c1.latitude);
    const lat2 = toRad(c2.latitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export const sortDistances = <T extends Coordinates>(
    target: Coordinates,
    items: T[],
): (T & { distance: number })[] => {
    return items
        .map((item) => ({
            ...item,
            distance: getDistanceMeters(target, item),
        }))
        .sort((a, b) => a.distance - b.distance);
};
