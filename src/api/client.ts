import { err, ok, Result, ResultAsync } from "neverthrow";
import type { HeaderSchema } from "../schemas/header";
import { createRequest, LoginData, type RequestInterface } from "../schemas/request";
import {
  type ActionsByMain,
  type MainAction,
  SuccessResultByMinor,
  isClientSecureAction,
} from "../schemas/enums";
import type { ApiResponse, MultiApiResponse } from "../schemas/response";
import { getUpayApiBaseUrl } from "../constants";
import {
  Upay_DEPOSITCREDITCARDTRANSFER_parameters,
  Upay_DEPOSITCREDITCARDTRANSFER_successResult,
  Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_parameters,
  Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_successResult,
  Upay_REDIRECTSETMYCREDITCARDDETAILS_parameters,
  Upay_REDIRECTSETMYCREDITCARDDETAILS_successResult,
} from "../schemas";
import {
  Upay_FULLCREATEACCOUNT_parameters,
  Upay_FULLCREATEACCOUNT_successResult,
} from "../schemas/FULLCREATEACCOUNT";

interface ApiConfig {
  baseUrl: string;
  liveSystem: boolean;
  language: "HE";
  verbose: boolean;
}

export class ApiClient {
  private readonly timeout = 60000;
  private readonly defaultHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  private mainSessionId = "";

  constructor(private readonly config: ApiConfig) {}

  private getBaseUrl(secure: boolean): string {
    return secure
      ? `${this.config.baseUrl}/API6/clientsecure/json.php`
      : `${this.config.baseUrl}/API6/client/json.php`;
  }

  private createHeaders(): HeaderSchema {
    return {
      ...(this.mainSessionId?.trim() && {
        sessionId: this.mainSessionId,
      }),
      refername: "UPAY",
      livesystem: this.config.liveSystem ? 1 : 0,
      language: this.config.language,
    };
  }

  private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  getSession(): ResultAsync<ApiResponse, Error> {
    const request: RequestInterface & { parameters: object } = {
      mainaction: "SESSION",
      minoraction: "GETSESSION",
      encoding: "json",
      parameters: {},
    };

    const headers = this.createHeaders();

    return this.sendRequest(false, {
      header: headers,
      request,
    }).map((data) => {
      if (data.result?.sessionId) {
        this.mainSessionId = data.result.sessionId;
      }
      return data;
    });
  }

  execute<M extends MainAction, A extends ActionsByMain<M>>({
    mainaction,
    minoraction,
    encoding,
    numberTemplate,
    parameters,
  }: RequestInterface<M, A>): ResultAsync<ApiResponse<SuccessResultByMinor<A>>, Error> {
    const request: RequestInterface & { parameters: object } = {
      mainaction,
      minoraction,
      encoding,
      ...(numberTemplate && { numberTemplate }),
      parameters: parameters ?? {},
    };

    const secure = isClientSecureAction(mainaction);

    return this.sendRequest(secure, {
      header: this.createHeaders(),
      request,
    }).map((data) => {
      if (data.result?.sessionId) {
        this.mainSessionId = data.result.sessionId;
      }
      return data as ApiResponse<SuccessResultByMinor<A>>;
    });
  }

  async executeWithLogin<M extends MainAction, A extends ActionsByMain<M>>(
    loginData: LoginData,
    { mainaction, minoraction, encoding, numberTemplate, parameters }: RequestInterface<M, A>
  ): Promise<Result<ApiResponse<SuccessResultByMinor<A>>, Error>> {
    const request: RequestInterface = {
      mainaction,
      minoraction,
      encoding,
      ...(numberTemplate && { numberTemplate }),
      parameters: parameters ?? {},
    };

    const result = await this.executeMultiple([
      {
        mainaction: "CONNECTION",
        minoraction: "LOGIN",
        encoding: "json",
        parameters: loginData,
      },
      request,
    ]);

    if (result.isErr()) {
      return err(result.error);
    }

    // todo - implement proper type checking
    return ok(result.value.results[1] as ApiResponse<SuccessResultByMinor<A>>);
  }

  private sendRequest<P extends object>(
    secure: boolean,
    payload: {
      header: HeaderSchema;
      request: RequestInterface & { parameters: P };
    }
  ): ResultAsync<ApiResponse, Error> {
    const url = this.getBaseUrl(secure);
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("msg", JSON.stringify(payload));

    return ResultAsync.fromPromise(
      this.fetchWithTimeout(url, {
        method: "POST",
        body: urlEncodedData,
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<ApiResponse>;
      }),
      (error) => {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            return new Error(`API request timed out after ${this.timeout}ms`);
          }
          return new Error(`API request failed: ${error.message}`);
        }
        return new Error(String(error));
      }
    ).map((data) => {
      if (data?.result?.sessionId) {
        this.mainSessionId = data.result.sessionId;
      }

      return data;
    });
  }

  executeMultiple(requests: Array<RequestInterface>): ResultAsync<MultiApiResponse, Error> {
    if (!requests.length) {
      return ResultAsync.fromPromise(
        Promise.reject(new Error("At least one request is required")),
        (error) => (error instanceof Error ? error : new Error(String(error)))
      );
    }

    const formattedRequests = requests.map((req) => ({
      header: this.createHeaders(),
      request: {
        mainaction: req.mainaction,
        minoraction: req.minoraction,
        encoding: req.encoding,
        numberTemplate: req.numberTemplate,
        parameters: req.parameters || {},
      },
    }));

    const url = this.getBaseUrl(isClientSecureAction(requests[0]?.mainaction));
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("msgs", JSON.stringify(formattedRequests));

    if (this.config.verbose) {
      console.log(`[executeMultiple][url] ${url}`);
      console.log(`[executeMultiple][msgs] ${JSON.stringify(formattedRequests)}`);
      console.log(`[executeMultiple][urlEncodedData] ${urlEncodedData.toString()}`);
    }

    return ResultAsync.fromPromise(
      this.fetchWithTimeout(url, {
        method: "POST",
        body: urlEncodedData,
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<MultiApiResponse>;
      }),
      (error) => {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            return new Error(`Multiple API requests timed out after ${this.timeout}ms`);
          }
          return new Error(`Multiple API requests failed: ${error.message}`);
        }
        return new Error(String(error));
      }
    ).map((data) => {
      if (this.config.verbose && data) {
        console.log(`[executeMultiple][data] ${JSON.stringify(data)}`);
      }
      return data;
    });
  }

  async FULLCREATEACCOUNT(
    parameters: Upay_FULLCREATEACCOUNT_parameters,
    numberTemplate?: string
  ): Promise<Result<ApiResponse<Upay_FULLCREATEACCOUNT_successResult>, Error>> {
    return await this.execute(
      createRequest({
        mainaction: "CONNECTION",
        minoraction: "FULLCREATEACCOUNT",
        parameters,
        numberTemplate,
      })
    );
  }

  /**
   * Get a redirect url for a credit card transfer
   */
  async REDIRECTDEPOSITCREDITCARDTRANSFER(
    loginData: LoginData,
    parameters: Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_parameters,
    numberTemplate?: string
  ): Promise<Result<ApiResponse<Upay_REDIRECTDEPOSITCREDITCARDTRANSFER_successResult>, Error>> {
    return await this.executeWithLogin(
      loginData,
      createRequest({
        mainaction: "CASHIER",
        minoraction: "REDIRECTDEPOSITCREDITCARDTRANSFER",
        parameters,
        numberTemplate,
      })
    );
  }

  /**
   * Charge a credit card with a credit card key (token)
   */
  async DEPOSITCREDITCARDTRANSFER(
    loginData: LoginData,
    parameters: Upay_DEPOSITCREDITCARDTRANSFER_parameters,
    numberTemplate?: string
  ): Promise<Result<ApiResponse<Upay_DEPOSITCREDITCARDTRANSFER_successResult>, Error>> {
    return await this.executeWithLogin(
      loginData,
      createRequest({
        mainaction: "CASHIER",
        minoraction: "DEPOSITCREDITCARDTRANSFER",
        parameters,
        numberTemplate,
      })
    );
  }

  /**
   * Get a redirect url for saving credit card details and token without charging the card
   */
  async REDIRECTSETMYCREDITCARDDETAILS(
    loginData: LoginData,
    parameters: Upay_REDIRECTSETMYCREDITCARDDETAILS_parameters,
    numberTemplate?: string
  ): Promise<Result<ApiResponse<Upay_REDIRECTSETMYCREDITCARDDETAILS_successResult>, Error>> {
    return await this.executeWithLogin(
      loginData,
      createRequest({
        mainaction: "ACCOUNTSECURE",
        minoraction: "REDIRECTSETMYCREDITCARDDETAILS",
        parameters,
        numberTemplate,
      })
    );
  }
}

export function createApiClient(config?: {
  demo?: boolean;
  liveSystem?: boolean;
  language?: "HE";
  verbose?: boolean;
}): ApiClient {
  return new ApiClient({
    baseUrl: getUpayApiBaseUrl(config?.demo ?? true),
    liveSystem: config?.liveSystem ?? false,
    language: config?.language ?? "HE",
    verbose: config?.verbose ?? false,
  });
}
