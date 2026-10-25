import z from "zod";

export const boundSchema = z
    .enum(["I", "O"])
    .transform((bound) => (bound === "I" ? "inbound" : "outbound"));
