import { UpayIpnQuery_REDIRECTDEPOSITCREDITCARDTRANSFER } from "./REDIRECTDEPOSITCREDITCARDTRANSFER";
import { UpayIpnQuery_REDIRECTSETMYCREDITCARDDETAILS } from "./REDIRECTSETMYCREDITCARDDETAILS";
import * as v from "@valibot/valibot";

export const UpayIpnQueries = {
  REDIRECTDEPOSITCREDITCARDTRANSFER: UpayIpnQuery_REDIRECTDEPOSITCREDITCARDTRANSFER,
  REDIRECTSETMYCREDITCARDDETAILS: UpayIpnQuery_REDIRECTSETMYCREDITCARDDETAILS,
} as const;
export type UpayIpnQueries = typeof UpayIpnQueries;

export const UpayIpnRequestQuery = v.union(Object.values(UpayIpnQueries).map((query) => query));
export type UpayIpnRequestQuery = v.InferOutput<typeof UpayIpnRequestQuery>;
