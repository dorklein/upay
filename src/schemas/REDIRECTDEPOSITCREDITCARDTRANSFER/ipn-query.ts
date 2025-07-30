import * as v from "@valibot/valibot";

export const ErrorDescription = v.picklist(["SUCCESS", "FAILURE"] as const);
export const UpayIpnQuery_REDIRECTDEPOSITCREDITCARDTRANSFER = v.object({
  providererrorcode: v.string(),
  errordescription: ErrorDescription,
  providererrordescription: v.string(),
  providerconfirmationnumber: v.string(),
  fourdigits: v.string(),
  depositamount: v.string(),
  depositnetamount: v.string(),
  amount: v.string(),
  firstpayment: v.string(),
  constantpayment: v.string(),
  numberpayments: v.string(),
  paymentdate: v.string(),
  commissionreduction: v.string(),
  clearer: v.string(),
  cardtype: v.string(),
  companytype: v.string(),
  foreign: v.string(),
  cardname: v.string(),
  cardownername: v.string(),
  comment: v.string(),
  depositcashierid: v.string(),
  transactionid: v.string(),
  merchantnumber: v.string(),
  identitynumber: v.string(),
  expirydate: v.string(),
  application: v.string(),
  productdescription: v.string(),
  cellphonenotify: v.string(),
  email: v.string(),
  emailnotify: v.string(),
  actiondate: v.string(),
  token: v.optional(v.string()),
});
export type UpayIpnQuery_REDIRECTDEPOSITCREDITCARDTRANSFER = v.InferOutput<
  typeof UpayIpnQuery_REDIRECTDEPOSITCREDITCARDTRANSFER
>;
