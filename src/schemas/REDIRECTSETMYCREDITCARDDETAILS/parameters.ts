import * as v from "@valibot/valibot";

const _baseSchema = v.object({
  // either email and passwordmd5 or key must be provided
  key: v.optional(v.string()),
  email: v.optional(v.pipe(v.string(), v.email())),
  passwordmd5: v.optional(v.string()),
  returnurl: v.optional(v.pipe(v.string(), v.url())),
  ipnurl: v.optional(v.pipe(v.string(), v.url())),
  providername: v.optional(v.string()),
  amount: v.optional(v.number()),
  cellphonenotify: v.optional(v.string()),
});
// validate either email and passwordmd5 or key must be provided
export const Upay_REDIRECTSETMYCREDITCARDDETAILS_parameters = v.pipe(
  _baseSchema,
  v.check((v) => {
    if (v.key) {
      return true;
    }
    if (v.email && v.passwordmd5) {
      return true;
    }
    return false;
  }, "Either email and passwordmd5 or key must be provided")
);
export type Upay_REDIRECTSETMYCREDITCARDDETAILS_parameters = v.InferOutput<
  typeof Upay_REDIRECTSETMYCREDITCARDDETAILS_parameters
>;

export const Upay_REDIRECTSETMYCREDITCARDDETAILS_successResult = v.object({
  url: v.string(),
  sessionId: v.string(),
});
export type Upay_REDIRECTSETMYCREDITCARDDETAILS_successResult = v.InferOutput<
  typeof Upay_REDIRECTSETMYCREDITCARDDETAILS_successResult
>;
