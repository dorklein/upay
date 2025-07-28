import * as v from "@valibot/valibot";
import { NumberBoolean } from "./common";

export const HeaderSchema = v.object({
  sessionId: v.optional(v.string()),
  refererName: v.literal("UPAY"),
  liveSystem: NumberBoolean,
  language: v.picklist(["HE"] as const),
});
export type HeaderSchema = v.InferOutput<typeof HeaderSchema>;
