import * as v from "@valibot/valibot";

export const UpdateDetailFields = v.picklist([
  "firstname",
  "lastname",
  "identitynumber",
  "companyname",
  "agentphonenumber",
  "phonenumber",
  "companyidentity",
  "birthcountry",
  "birthdate",
  "sex",
  "identitynumbercreationdate",
  "identitynumberexpirydate",
  "incorporationdate",
  "companynameEN",
  "yellowpageid",
  "address",
  "city",
  "agentcity",
  "agentaddress",
] as const);

const UpdateDetailField = v.object({
  field: UpdateDetailFields,
  value: v.string(),
});

export const Upay_FULLCREATEACCOUNT_parameters = v.object({
  email: v.string(),
  updatedetails: v.array(UpdateDetailField),
  password: v.optional(v.string()),
  bankcode: v.optional(v.string()),
  branchcode: v.optional(v.string()),
  accountnumber: v.optional(v.string()),
  parentid: v.optional(v.string()),
  providername: v.optional(v.string()),
  programname: v.optional(v.string()),
  contacts: v.any(),
  buildingnumber: v.optional(v.number()),
  streetname: v.optional(v.string()),
  captcha: v.optional(v.string()),
  captchav2: v.optional(v.string()),
});
export type Upay_FULLCREATEACCOUNT_parameters = v.InferOutput<
  typeof Upay_FULLCREATEACCOUNT_parameters
>;

export const Upay_FULLCREATEACCOUNT_successResult = v.object({
  transactions: v.array(
    v.object({
      cashierid: v.number(),
      totalamount: v.string(),
      url: v.string(),
    })
  ),
  sessionId: v.string(),
});
export type Upay_FULLCREATEACCOUNT_successResult = v.InferOutput<
  typeof Upay_FULLCREATEACCOUNT_successResult
>;
