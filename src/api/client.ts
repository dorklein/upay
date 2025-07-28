import axios from "axios";
import { ResultAsync } from "neverthrow";
import type { HeaderSchema } from "../schemas/header";
import { createRequest, type RequestInterface } from "../schemas/request";
import { type ActionsByMain, type MainAction, isClientSecureAction } from "../schemas/enums";
import type { ApiResponse } from "../schemas/response";
import { getUpayApiBaseUrl } from "../constants";
interface ApiConfig {
  baseUrl: string;
  liveSystem: boolean;
  language: "HE";
  verbose: boolean;
}

export class ApiClient {
  private readonly axios = axios.create({
    timeout: 60000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
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

  getSession(): ResultAsync<ApiResponse, Error> {
    const request: RequestInterface & { parameters: object } = {
      mainAction: "SESSION",
      minorAction: "GETSESSION",
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
    mainAction,
    minorAction,
    encoding,
    numberTemplate,
    parameters,
  }: RequestInterface<M, A>): ResultAsync<ApiResponse, Error> {
    const request: RequestInterface & { parameters: object } = {
      mainAction,
      minorAction,
      encoding,
      ...(numberTemplate && { numberTemplate }),
      parameters: parameters ?? {},
    };

    const secure = isClientSecureAction(mainAction);

    return this.sendRequest(secure, {
      header: this.createHeaders(),
      request,
    }).map((data) => {
      if (data.result?.sessionId) {
        this.mainSessionId = data.result.sessionId;
      }
      return data;
    });
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

    return ResultAsync.fromPromise(this.axios.post<ApiResponse>(url, urlEncodedData), (error) => {
      if (axios.isAxiosError(error)) {
        return new Error(`API request failed: ${error.message}`);
      }
      return error instanceof Error ? error : new Error(String(error));
    }).map((response) => {
      if (
        response.data?.result?.mainAction === "SESSION" &&
        response.data?.result?.minorAction === "LOGOUT"
      ) {
        this.mainSessionId = response.data.result.sessionId ?? "";
      }

      return response.data;
    });
  }

  executeMultiple(requests: Array<RequestInterface>): ResultAsync<ApiResponse[], Error> {
    if (!requests.length) {
      return ResultAsync.fromPromise(
        Promise.reject(new Error("At least one request is required")),
        (error) => (error instanceof Error ? error : new Error(String(error)))
      );
    }

    const formattedRequests = requests.map((req) => ({
      header: this.createHeaders(),
      request: {
        mainAction: req.mainAction,
        minorAction: req.minorAction,
        encoding: req.encoding,
        numberTemplate: req.numberTemplate,
        parameters: req.parameters || {},
      },
    }));

    const url = this.getBaseUrl(isClientSecureAction(requests[0]?.mainAction));
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("msgs", JSON.stringify(formattedRequests));

    if (this.config.verbose) {
      console.log(`[executeMultiple][url] ${url}`);
      console.log(`[executeMultiple][msgs] ${JSON.stringify(formattedRequests)}`);
      console.log(`[executeMultiple][urlEncodedData] ${urlEncodedData.toString()}`);
    }

    return ResultAsync.fromPromise(this.axios.post<ApiResponse[]>(url, urlEncodedData), (error) => {
      if (axios.isAxiosError(error)) {
        return new Error(`Multiple API requests failed: ${error.message}`);
      }
      return error instanceof Error ? error : new Error(String(error));
    }).map((response) => response.data);
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
