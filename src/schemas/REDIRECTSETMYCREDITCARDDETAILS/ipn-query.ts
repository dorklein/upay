import { UpayCardType } from "../enums";
import { UpayCompanyType } from "../enums";

import * as v from "@valibot/valibot";

export const UpayIpnQuery_REDIRECTSETMYCREDITCARDDETAILS = v.object({
  providererrorcode: v.string(),
  creditcardkey: v.string(),
  cardownername: v.string(),
  identitynumber: v.string(),
  fourdigits: v.string(),
  cardname: v.string(),
  companytype: UpayCompanyType,
  cardtype: UpayCardType,
  expirydate: v.string(),
});
export type UpayIpnQuery_REDIRECTSETMYCREDITCARDDETAILS = v.InferOutput<
  typeof UpayIpnQuery_REDIRECTSETMYCREDITCARDDETAILS
>;
