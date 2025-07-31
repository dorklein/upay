import * as v from "@valibot/valibot";
import { UpayTransfer } from "../REDIRECTDEPOSITCREDITCARDTRANSFER";
import { NumberBoolean } from "../common";

const _baseSchema = v.object({
  // either email and passwordmd5 or key must be provided
  key: v.optional(v.string()),
  email: v.optional(v.pipe(v.string(), v.email())),
  passwordmd5: v.optional(v.string()),
  creditcardkey: v.optional(v.string()),
  magneticstrip: v.optional(NumberBoolean),
  connection: v.optional(NumberBoolean),
  providername: v.optional(v.string()),
  redirectsessionid: v.optional(v.string()),
  cardnumber: v.optional(v.string()),
  cvv: v.optional(v.string()),
  expiryyear: v.optional(v.string()),
  expirymonth: v.optional(v.string()),
  foreign: v.optional(NumberBoolean),
  createtoken: v.optional(NumberBoolean),
  createreceipt: v.optional(NumberBoolean),
  sixdigits: v.optional(v.pipe(v.string(), v.length(6))),
  cardownername: v.optional(v.string()),
  identitynumber: v.optional(v.string()),
  mobile: v.optional(NumberBoolean),
  googleapplepay: v.optional(NumberBoolean),
  verify: v.optional(NumberBoolean),
  transfers: v.array(UpayTransfer),
});
export const Upay_DEPOSITCREDITCARDTRANSFER_parameters = v.pipe(
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
export type Upay_DEPOSITCREDITCARDTRANSFER_parameters = v.InferOutput<
  typeof Upay_DEPOSITCREDITCARDTRANSFER_parameters
>;

export const Upay_DEPOSITCREDITCARDTRANSFER_successResult = v.object({
  transactions: v.array(
    v.object({
      cashierid: v.number(),
      depositcashierid: v.number(),
      transactionid: v.string(),
    })
  ),
  sessionId: v.string(),
});
export type Upay_DEPOSITCREDITCARDTRANSFER_successResult = v.InferOutput<
  typeof Upay_DEPOSITCREDITCARDTRANSFER_successResult
>;
