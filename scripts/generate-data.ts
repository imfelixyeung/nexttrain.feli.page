import { parse } from "csv-parse/stream";
import z from "zod";

const DATASOURCE =
    "https://opendata.mtr.com.hk/data/mtr_lines_and_stations.csv";

const response = await fetch(DATASOURCE);

const parser = response.body?.pipeThrough(
    parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
    }),
);

if (!parser) {
    console.log("Parser failed");
    process.exit(1);
}

const rawRecords = [];
for await (const record of parser) {
    rawRecords.push(record);
}

const transformSchema = z
    .object({
        "Line Code": z.string(),
        Direction: z.string(),
        "Station Code": z.string(),
        "Station ID": z.string(),
        "Chinese Name": z.string(),
        "English Name": z.string(),
        Sequence: z.coerce.number(),
    })
    .transform(
        ({
            "Line Code": line,
            Direction: direction,
            "Station Code": station,
            "Chinese Name": nameZH,
            "English Name": nameEN,
            Sequence: sequence,
        }) => ({
            line,
            direction,
            station,
            nameZH,
            nameEN,
            sequence,
        }),
    );

const records = await z.array(transformSchema).parseAsync(rawRecords);
records.sort((a, b) => a.sequence - b.sequence);
records.sort((a, b) => b.direction.localeCompare(a.direction));

const lines: {
    [line: string]: {
        stations: string[];
    };
} = {
    AEL: { stations: [] },
    TCL: { stations: [] },
    TML: { stations: [] },
    TKL: { stations: [] },
    EAL: { stations: [] },
    SIL: { stations: [] },
    TWL: { stations: [] },
    ISL: { stations: [] },
    KTL: { stations: [] },
    DRL: { stations: [] },
};

type i18n = {
    lines: Record<string, string>;
    stations: Record<string, string>;
};

const i18nEN: i18n = { lines: {}, stations: {} };
const i18nZH: i18n = { lines: {}, stations: {} };

records.forEach((record) => {
    if (!record.station || !record.line) return;

    i18nEN.stations[record.station] = record.nameEN;
    i18nZH.stations[record.station] = record.nameZH;

    if (!(record.line in lines)) {
        lines[record.line] = { stations: [] };
    }

    if (lines[record.line].stations.includes(record.station)) return;

    lines[record.line].stations.push(record.station);
});

console.log(JSON.stringify(lines));
console.log(JSON.stringify(i18nEN));
console.log(JSON.stringify(i18nZH));
