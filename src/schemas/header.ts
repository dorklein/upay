import * as v from "@valibot/valibot";
import { NumberBoolean } from "./common";

export const HeaderSchema = v.object({
  sessionId: v.optional(v.string()),
  refername: v.literal("UPAY"),
  livesystem: NumberBoolean,
  language: v.picklist(["HE"] as const),
});
export type HeaderSchema = v.InferOutput<typeof HeaderSchema>;
