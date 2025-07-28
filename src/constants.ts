export const UPAY_API_BASE_URL = "https://app.upay.co.il"
export const UPAY_DEMO_API_BASE_URL = "https://demo.upay.co.il"

export function getUpayApiBaseUrl(demo: boolean): string {
  return demo ? UPAY_DEMO_API_BASE_URL : UPAY_API_BASE_URL
}
