import * as v from "@valibot/valibot";

export const ResponseHeaderSchema = v.object({
  errorcode: v.string(),
  errormessage: v.string(),
  errordescription: v.string(),
  provider: v.string(),
  timestamp: v.string(),
});
export type ResponseHeaderSchema = v.InferOutput<typeof ResponseHeaderSchema>;

export const BaseResultSchema = v.object({
  sessionId: v.string(),
});
export type BaseResultSchema = v.InferOutput<typeof BaseResultSchema>;

export interface ApiResponse<T = unknown> {
  success: boolean;
  header: ResponseHeaderSchema;
  result: T & BaseResultSchema;
}

export type MultiApiResponse<T = unknown> = {
  results: ApiResponse<T>[];
};
