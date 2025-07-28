import * as v from "@valibot/valibot";

export const UpayCurrency = v.picklist(["USD", "NIS"] as const);
export type UpayCurrency = v.InferOutput<typeof UpayCurrency>;
