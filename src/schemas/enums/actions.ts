import * as v from "@valibot/valibot";
import {
  Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_parameters,
  Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_successResult,
} from "../REDIRECTDEPOSITCREDITCARDTRANSFER";
import {
  Upay_REDIRECTSETMYCREDITCARDDETAILS_parameters,
  Upay_REDIRECTSETMYCREDITCARDDETAILS_successResult,
} from "../REDIRECTSETMYCREDITCARDDETAILS";
import {
  Upay_DEPOSITCREDITCARDTRANSFER_parameters,
  Upay_DEPOSITCREDITCARDTRANSFER_successResult,
} from "../DEPOSITCREDITCARDTRANSFER";
import {
  Upay_FULLCREATEACCOUNT_parameters,
  Upay_FULLCREATEACCOUNT_successResult,
} from "../FULLCREATEACCOUNT";

const clientActions = {
  INTERFACES: [
    "CHECKEMAILS",
    "GETACTIVEPROGRAMNAMES",
    "GETADDINGWORKINGDAYS",
    "GETAGENTTYPES",
    "GETAPIINPUTTYPE",
    "GETAPIINPUTTYPES",
    "GETAPIPARAMETERS",
    "GETAPIWORDS",
    "GETBANKS",
    "GETCITIES",
    "GETCLOSESTWORKINGDAY",
    "GETCOMPANYTYPE",
    "GETCOUNTRIES",
    "GETERRORMESSAGES",
    "GETMINORACTIONS",
    "GETSECURITYQUESTION",
    "GETSTREETS",
    "GETYELLOWPAGES",
  ],
  SESSION: ["GETREDIRECTSESSIONSTATUSGUEST", "GETSESSION", "LOGOUT", "REFRESHSESSION"],
} as const;

// Object containing all secure client actions grouped by category
const clientSecureActions = {
  // Account-related secure actions for user management and personal data
  ACCOUNTSECURE: [
    // Accept automatic acceptance of terms
    "ACCEPTAUTOMATICACCEPT",
    // Add email addresses to an account
    "ADDEMAILS",
    // Add a new lead to the system
    "ADDLEAD",
    // Add an action to an existing lead
    "ADDLEADACTION",
    // Add a survey response
    "ADDSURVEY",
    // Change user password
    "CHANGEPASSWORD",
    // Verify credit card details
    "CHECKMYCREDITCARDDETAILS",
    // Close agent accounts
    "CLOSEAGENTS",
    // Create new agent accounts
    "CREATEAGENTS",
    // Create a new contact
    "CREATECONTACT",
    // Create multiple contacts
    "CREATECONTACTS",
    // Delete an existing contact
    "DELETECONTACT",
    // Delete user's bank details
    "DELETEMYBANKDETAILS",
    // Delete user's credit card details
    "DELETEMYCREDITCARDDETAILS",
    // Initiate password recovery
    "FORGOTPASSWORD",
    // Get account statement information
    "GETACCOUNTSTATEMENT",
    // Get list of affiliate users
    "GETAFFILIATESUSERS",
    // Get all leads in the system
    "GETALLLEADS",
    // Get company details
    "GETCOMPANYDETAILS",
    // Get actions performed on leads
    "GETLEADACTIONS",
    // Get email messages
    "GETMAILS",
    // Get account financial summary
    "GETMYACCOUNTFINANCIALSUMMARY",
    // Get user's agents
    "GETMYAGENTS",
    // Get user's account balances
    "GETMYBALANCES",
    // Get user's bank details
    "GETMYBANKDETAILS",
    // Get user's commission information
    "GETMYCOMMISSIONS",
    // Get user's contacts
    "GETMYCONTACTS",
    // Get user's credit card details
    "GETMYCREDITCARDDETAILS",
    // Get user's personal details
    "GETMYDETAILS",
    // Get user's financial summary
    "GETMYFINANCIALSUMMARY",
    // Get user's invoices
    "GETMYINVOICES",
    // Get user's account limits
    "GETMYLIMITS",
    // Get user's signup status
    "GETMYSIGNUPSTATUS",
    // Get historical leads
    "GETOLDLEADS",
    // Get redirect session parameters
    "GETREDIRECTSESSIONPARAMETERS",
    // Get user balance for a specific date
    "GETUSERBALANCEPERDATE",
    // Get user redirect page links
    "GETUSERREDIRECTPAGELINKS",
    // Prepare credit card verification
    "PREPARECREDITCARDVERIFIED",
    // Redirect to set credit card details
    "REDIRECTSETMYCREDITCARDDETAILS",
    // Redirect to update user details
    "REDIRECTUPDATEMYDETAILS",
    // Redirect to update user knowledge
    "REDIRECTUPDATEMYUSERKNOWLEDGE",
    // Refuse automatic acceptance of terms
    "REFUSEAUTOMATICACCEPT",
    // Search for a contact
    "SEARCHCONTACT",
    // Set additional data for bank details
    "SETBANKDETAILSADDITIONALDATA",
    // Set order index for bank details
    "SETBANKDETAILSORDERINDEX",
    // Set additional data for credit card
    "SETCREDITCARDADDITIONALDATA",
    // Set credit card details for guest
    "SETCREDITCARDDETAILSGUEST",
    // Set order index for credit card
    "SETCREDITCARDORDERINDEX",
    // Mark credit card as verified
    "SETCREDITCARDVERIFIED",
    // Set user's bank details
    "SETMYBANKDETAILS",
    // Set user's credit card details
    "SETMYCREDITCARDDETAILS",
    // Set credit card details for guest
    "SETMYCREDITCARDDETAILSGUEST",
    // Set user settings
    "SETMYSETTINGS",
    // Update agent information
    "UPDATEAGENTS",
    // Update contact information
    "UPDATECONTACT",
    // Update user's credit card details
    "UPDATEMYCREDITCARDDETAILS",
    // Update user's personal details
    "UPDATEMYDETAILS",
    // Update guest user knowledge
    "UPDATEUSERKNOWLEDGEGUEST",
  ],
  // Payment processing and cashier-related operations
  CASHIER: [
    // Accept a credit card deposit transfer
    "ACCEPTDEPOSITCREDITCARDTRANSFER",
    // Accept a credit card deposit transfer for guest
    "ACCEPTDEPOSITCREDITCARDTRANSFERGUEST",
    // Add recurring debits
    "ADDCONSTANTDEBITS",
    // Add recurring debits for guest
    "ADDCONSTANTDEBITSGUEST",
    // Add recurring transfers
    "ADDCONSTANTTRANSFERS",
    // Add loans
    "ADDLOANS",
    // Add a comment to user's account
    "ADDMYCOMMENT",
    // Block a redirect page link
    "BLOCKREDIRECTPAGELINK",
    // Cancel a bank transfer deposit
    "CANCELDEPOSITBANKTRANSFER",
    // Cancel a credit card transfer deposit
    "CANCELDEPOSITCREDITCARDTRANSFER",
    // Cancel a pending payment
    "CANCELPENDINGPAYMENT",
    // Cancel a transfer
    "CANCELTRANSFER",
    // Change withdrawal payment method
    "CHANGEWITHDRAWALPAYMENTMETHOD",
    // Check cancellation of credit card deposit
    "CHECKCANCELDEPOSITCREDITCARDTRANSFER",
    // Check redirect for credit card deposit
    "CHECKREDIRECTDEPOSITCREDITCARDTRANSFER",
    // Create a payment
    "CREATEPAYMENT",
    // Create a redirect page
    "CREATEREDIRECTPAGE",
    // Deposit via bank transfer
    "DEPOSITBANKTRANSFER",
    // Deposit via credit card
    "DEPOSITCREDITCARD",
    // Transfer deposit via credit card
    "DEPOSITCREDITCARDTRANSFER",
    // Transfer deposit via credit card for guest
    "DEPOSITCREDITCARDTRANSFERGUEST",
    // Transfer deposit via credit card for user
    "DEPOSITCREDITCARDTRANSFERUSER",
    // Get clearing tables for credit card deposits
    "GETDEPOSITCREDITCARDTRANSFERCLEARINGTABLES",
    // Retry a credit card deposit
    "REDEPOSITCREDITCARD",
    // Redirect to add recurring debits
    "REDIRECTADDCONSTANTDEBITS",
    // Redirect to deposit via credit card transfer
    "REDIRECTDEPOSITCREDITCARDTRANSFER",
    // Redirect to a page
    "REDIRECTPAGE",
    // Refuse a credit card deposit transfer
    "REFUSEDEPOSITCREDITCARDTRANSFER",
    // Refuse a pending payment
    "REFUSEPENDINGPAYMENT",
    // Return a credit card deposit transfer
    "RETURNDEPOSITCREDITCARDTRANSFER",
    // Withdraw all funds to bank in advance
    "WITHDRAWALBANKADVANCEALL",
    // Withdraw to bank
    "WITHDRAWALSBANK",
    // Withdraw to credit card
    "WITHDRAWALSCREDITCARD",
    // Withdraw via credit card transfer
    "WITHDRAWCREDITCARDTRANSFER",
  ],
  // Authentication and account connection actions
  CONNECTION: [
    // Create a new account
    "CREATEACCOUNT",
    // Complete account creation process
    "FULLCREATEACCOUNT",
    // Get account creation details
    "GETCREATEACCOUNT",
    // Get security key
    "GETKEY",
    // Get main interface
    "GETMAININTERFACE",
    // User login
    "LOGIN",
    // Login as a different user
    "LOGINASUSER",
    // Redirect to account creation
    "REDIRECTCREATEACCOUNT",
  ],
  // Customer office and invoice management
  CUSTOMEROFFICE: [
    // Create an invoice for a client
    "CREATECLIENTINVOICE",
    // Create customer invoices state report
    "CREATECUSTOMERINVOICESSTATEREPORT",
    // Create expenses
    "CREATEEXPENSES",
    // Delete company logo
    "DELETECOMPANYLOGO",
    // Delete expenses
    "DELETEEXPENSES",
    // Generate an invoice template
    "GENERATEINVOICETEMPLATE",
    // Get expenses
    "GETEXPENSES",
    // Get expense types
    "GETEXPENSETYPES",
    // Get client invoices
    "GETMYCLIENTINVOICES",
    // Get invoice template
    "GETMYINVOICETEMPLATE",
    // Update an expense
    "UPDATEEXPENSE",
    // Update invoice template
    "UPDATEMYINVOICETEMPLATE",
  ],
  // Regulatory compliance actions
  REGULATION: [
    // Get renewal invoice token
    "GETRENEWALINVOICETOKEN",
    // Set renewal invoice token
    "SETRENEWALINVOICETOKEN",
  ],
  // Transaction actions for processing payments
  TRANSACTIONSACTION: [
    // Accept an assured transaction
    "ACCEPTASSURETRANSACTION",
    // Accept transactions
    "ACCEPTTRANSACTIONS",
    // Activate payment actions
    "ACTIVATEPAYMENTACTIONS",
    // Advance a transaction
    "ADVANCETRANSACTION",
    // Calculate commission
    "CALCULATECOMMISSION",
    // Calculate commission for guest
    "CALCULATECOMMISSIONGUEST",
    // Calculate number of payments
    "CALCULATENUMBERPAYMENTS",
    // Delete payment actions
    "DELETEPAYMENTACTIONS",
    // Refuse an assured transaction
    "REFUSEASSURETRANSACTION",
    // Refuse transactions
    "REFUSETRANSACTIONS",
    // Retry a constant debit charge
    "RETRANSMITCONSTANTDEBITCHARGE",
  ],
  // Transaction information retrieval
  TRANSACTIONSINFO: [
    // Download a document file
    "DOWNLOADDOCUMENTFILE",
    // Download a file
    "DOWNLOADFILE",
    // Get account summary
    "GETACCOUNTSUMMARY",
    // Get affiliates summary
    "GETAFFILILATESSUMMARY",
    // Get balance details
    "GETBALANCEDETAILS",
    // Get bank withdrawals details
    "GETBANKWITHDRAWALSDETAILS",
    // Get bank withdrawals summary
    "GETBANKWITHDRAWALSSUMMARY",
    // Get cancelled transactions
    "GETCANCELLEDTRANSACTIONS",
    // Get closed transactions
    "GETCLOSEDTRANSACTIONS",
    // Get future transactions
    "GETFUTURETRANSACTIONS",
    // Get multiple transactions
    "GETMULTIPLETRANSACTIONS",
    // Get user's transactions
    "GETMYTRANSACTIONS",
    // Get open transactions
    "GETOPENTRANSACTIONS",
    // Get payment action details
    "GETPAYMENTACTIONDETAILS",
    // Get payment actions
    "GETPAYMENTACTIONS",
    // Get pending payments
    "GETPENDINGPAYMENTS",
    // Get pending transactions
    "GETPENDINGTRANSACTIONS",
    // Get receipt
    "GETRECEIPT",
    // Get card reader report
    "GETREPORTCARDREADER",
    // Get sent invoices report
    "GETSENDINVOICESREPORT",
    // Get transaction ID
    "GETTRANSACTIONID",
    // Get transactions
    "GETTRANSACTIONS",
    // Get advanced transaction info
    "GETTRANSACTIONSADVANCED",
    // Get affiliate transactions
    "GETTRANSACTIONSAFFILIATES",
    // Get delayed transactions
    "GETTRANSACTIONSDELAYED",
    // Get detailed transaction info
    "GETTRANSACTIONSDETAILED",
    // Get transactions to verify
    "GETVERIFYTRANSACTIONS",
  ],
  // File upload actions
  UPLOAD: [
    // Upload files as guest
    "UPLOADFILESGUEST",
    // Upload internal files
    "UPLOADINTERNALFILES",
    // Upload lead file
    "UPLOADLEADFILE",
    // Upload user files
    "UPLOADUSERFILES",
  ],
} as const;

export const actions = {
  ...clientActions,
  ...clientSecureActions,
} as const;
export type Actions = typeof actions;
export const MainAction = v.picklist([
  // Client actions
  "INTERFACES",
  "SESSION",
  // Secure actions
  "ACCOUNTSECURE",
  "CASHIER",
  "CONNECTION",
  "CUSTOMEROFFICE",
  "REGULATION",
  "TRANSACTIONSACTION",
  "TRANSACTIONSINFO",
  "UPLOAD",
] as const);
export type MainAction = v.InferOutput<typeof MainAction>;

export const ActionsObj = v.object({
  // Client actions
  INTERFACES: v.picklist(actions.INTERFACES),
  SESSION: v.picklist(actions.SESSION),
  // Secure actions
  ACCOUNTSECURE: v.picklist(actions.ACCOUNTSECURE),
  CASHIER: v.picklist(actions.CASHIER),
  CONNECTION: v.picklist(actions.CONNECTION),
  CUSTOMEROFFICE: v.picklist(actions.CUSTOMEROFFICE),
  REGULATION: v.picklist(actions.REGULATION),
  TRANSACTIONSACTION: v.picklist(actions.TRANSACTIONSACTION),
  TRANSACTIONSINFO: v.picklist(actions.TRANSACTIONSINFO),
  UPLOAD: v.picklist(actions.UPLOAD),
});
export type ActionsObj = v.InferOutput<typeof ActionsObj>;

export type ActionsByMain<T extends MainAction> = ActionsObj[T];

export const ClientMainAction = v.picklist(["INTERFACES", "SESSION"] as const);
export type ClientMainAction = v.InferOutput<typeof ClientMainAction>;

export function isClientAction(action: MainAction): action is ClientMainAction {
  return v.is(ClientMainAction, action);
}

export const ClientSecureMainAction = v.picklist([
  "ACCOUNTSECURE",
  "CASHIER",
  "CONNECTION",
  "CUSTOMEROFFICE",
  "REGULATION",
  "TRANSACTIONSACTION",
  "TRANSACTIONSINFO",
  "UPLOAD",
] as const);
export type ClientSecureMainAction = v.InferOutput<typeof ClientSecureMainAction>;
export function isClientSecureAction(action: MainAction): action is ClientSecureMainAction {
  return v.is(ClientSecureMainAction, action);
}
////////

export const MinorAction = v.picklist([
  // Client actions
  ...clientActions.INTERFACES,
  ...clientActions.SESSION,
  // Secure actions
  ...clientSecureActions.ACCOUNTSECURE,
  ...clientSecureActions.CASHIER,
  ...clientSecureActions.CONNECTION,
  ...clientSecureActions.CUSTOMEROFFICE,
  ...clientSecureActions.REGULATION,
  ...clientSecureActions.TRANSACTIONSACTION,
  ...clientSecureActions.TRANSACTIONSINFO,
  ...clientSecureActions.UPLOAD,
]);
export type MinorAction = v.InferOutput<typeof MinorAction>;

// TODO: extend this to all parameters
type Parameters = {
  REDIRECTDEPOSITCREDITCARDTRANSFER: Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_parameters;
  REDIRECTSETMYCREDITCARDDETAILS: Upay_REDIRECTSETMYCREDITCARDDETAILS_parameters;
  DEPOSITCREDITCARDTRANSFER: Upay_DEPOSITCREDITCARDTRANSFER_parameters;
  FULLCREATEACCOUNT: Upay_FULLCREATEACCOUNT_parameters;
  [key: string]: unknown;
};
export type ParameterByMinor<T extends MinorAction> = T extends MinorAction
  ? Parameters[T]
  : Record<string, unknown>;

type SuccessResults = {
  REDIRECTDEPOSITCREDITCARDTRANSFER: Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_successResult;
  REDIRECTSETMYCREDITCARDDETAILS: Upay_REDIRECTSETMYCREDITCARDDETAILS_successResult;
  DEPOSITCREDITCARDTRANSFER: Upay_DEPOSITCREDITCARDTRANSFER_successResult;
  FULLCREATEACCOUNT: Upay_FULLCREATEACCOUNT_successResult;
  [key: string]: unknown;
};
export type SuccessResultByMinor<T extends MinorAction> = T extends MinorAction
  ? SuccessResults[T]
  : Record<string, unknown>;
