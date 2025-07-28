import { UpayCardType } from "../enums";
import { UpayCompanyType } from "../enums";
import { NumberBoolean } from "../common";
import { UpayCurrency } from "../enums";
import * as v from "@valibot/valibot";

export const UpayTransfer = v.object({
  email: v.optional(v.pipe(v.string(), v.email())),
  productdescription: v.optional(v.string()),
  cellphonenotify: v.optional(v.string()),
  comment: v.optional(v.string()),
  commissionreduction: v.optional(v.number()),
  amount: v.optional(v.number()),
  numberpayments: v.optional(v.number()),
  ipnurl: v.optional(v.pipe(v.string(), v.url())),
  directdebit: v.optional(NumberBoolean),
  currency: v.optional(UpayCurrency),
});
export type UpayTransfer = v.InferOutput<typeof UpayTransfer>;

export const _baseSchema = v.object({
  // either email and passwordmd5 or key must be provided
  key: v.optional(v.string()),
  email: v.optional(v.pipe(v.string(), v.email())),
  passwordmd5: v.optional(v.string()),
  cardreader: v.optional(NumberBoolean),
  creditcardcompanytype: v.optional(UpayCompanyType),
  creditcardtype: v.optional(UpayCardType),
  provider: v.optional(NumberBoolean),
  providername: v.optional(v.string()),
  foreign: v.optional(NumberBoolean),
  createtoken: v.optional(NumberBoolean),
  createreceipt: v.optional(NumberBoolean),
  interface: v.optional(v.string()), // interfaceparameters
  sixdigits: v.optional(v.pipe(v.string(), v.length(6))),
  cardownername: v.optional(v.string()),
  identitynumber: v.optional(v.string()),
  notmobile: v.optional(NumberBoolean),
  mobile: v.optional(NumberBoolean),
  googleapplepay: v.optional(NumberBoolean),
  "3dsecure": v.optional(NumberBoolean),
  transfers: v.array(UpayTransfer),
});
export const Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_parameters = v.pipe(
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
export type Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_parameters = v.InferOutput<
  typeof Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_parameters
>;
