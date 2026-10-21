import linesJson from "./lines.json";

export const lines = linesJson;

export type Line = keyof typeof lines;
export const lineIds = Object.keys(lines) as Line[];

export function assertValidLine(line: string): asserts line is Line {
    const valid = Object.keys(lines).includes(line);
    if (valid) return;

    throw new Error(`Invalid line, got '${line}'`);
}
