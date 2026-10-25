import { describe, expect, it } from "bun:test";
import { type Coordinates, sortDistances } from "./coordinates";

describe("sortDistances", () => {
    const target: Coordinates = { latitude: 0, longitude: 0 };

    it("should sort items by distance and inject distance in meters", () => {
        const items = [
            { id: "far", latitude: 1, longitude: 1 },
            { id: "close", latitude: 0.1, longitude: 0.1 },
        ];

        const sorted = sortDistances(target, items);

        expect(sorted).toHaveLength(2);
        expect(sorted[0].id).toBe("close");
        expect(sorted[1].id).toBe("far");
        expect(typeof sorted[0].distance).toBe("number");
        expect(sorted[0].distance).toBeLessThan(sorted[1].distance);
    });

    it("should not mutate the original array", () => {
        const items = [
            { id: "far", latitude: 1, longitude: 1 },
            { id: "close", latitude: 0.1, longitude: 0.1 },
        ];
        const originalCopy = JSON.parse(JSON.stringify(items));

        sortDistances(target, items);

        expect(items).toEqual(originalCopy);
    });

    it("should handle an empty array", () => {
        const items: Coordinates[] = [];
        const sorted = sortDistances(target, items);

        expect(sorted).toEqual([]);
    });

    it("should handle items with identical distances", () => {
        const items = [
            { id: "a", latitude: 1, longitude: 1 },
            { id: "b", latitude: 1, longitude: 1 },
        ];

        const sorted = sortDistances(target, items);

        expect(sorted).toHaveLength(2);
        expect(sorted[0].distance).toEqual(sorted[1].distance);
    });
});
