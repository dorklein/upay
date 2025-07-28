import * as v from "@valibot/valibot";

export const UpayCompanyType = v.picklist([
  "ISR", // Isracard
  "DIN", // Diners
  "CAL", // Cal
  "LMI", // Leumi
  "AMX", // American Express
] as const);
export type UpayCompanyType = v.InferOutput<typeof UpayCompanyType>;
