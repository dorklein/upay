import * as v from "@valibot/valibot";

export const ErrorMessageSchema = v.object({
  errorid: v.string(),
  errormessage: v.string(),
  messageEN: v.string(),
  messageHE: v.string(),
});
export type ErrorMessageSchema = v.InferOutput<typeof ErrorMessageSchema>;

export const ErrorMessagesSchema = v.array(ErrorMessageSchema);
export type ErrorMessagesSchema = v.InferOutput<typeof ErrorMessagesSchema>;
