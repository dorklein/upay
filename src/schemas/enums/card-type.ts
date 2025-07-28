import * as v from "@valibot/valibot";

export const UpayCardType = v.picklist([
  "MA", // MasterCard
  "MS", // Maestro
  "PR", // Private Label
  "VI", // Visa
  "IS", // Isracard
] as const);
export type UpayCardType = v.InferOutput<typeof UpayCardType>;
