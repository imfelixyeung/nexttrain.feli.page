// Source: https://opendata.mtr.com.hk/doc/Next_Train_DataDictionary_v1.7.pdf
import { lines as linesJson } from "./lines";

export const lines = Object.fromEntries(
    Object.entries(linesJson).map(([line, value]) => [
        line,
        {
            terminals: {
                // biome-ignore lint/style/noNonNullAssertion: must exist
                UP: value.stations[value.stations.length - 1]!,
                // biome-ignore lint/style/noNonNullAssertion: must exist
                DOWN: value.stations[0]!,
            },
            colour: `var(--mtr-line-${line.toLowerCase()})`,
            ...value,
        },
    ]),
);

export type Line = keyof typeof linesJson;
export const lineIds = Object.keys(lines) as Line[];

export function assertValidLine(line: string): asserts line is Line {
    const valid = Object.keys(lines).includes(line);
    if (valid) return;

    throw new Error(`Invalid line, got '${line}'`);
}
