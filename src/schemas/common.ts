import * as v from "@valibot/valibot";

export const NumberBoolean = v.picklist([0, 1] as const);
export type NumberBoolean = v.InferOutput<typeof NumberBoolean>;
