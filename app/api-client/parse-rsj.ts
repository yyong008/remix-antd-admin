/** Matches `rsj` / `rfj` from `~/utils/server/response-json` (success `code === 0`). */
export const RSJ_OK = 0;

export type RsjEnvelope<T> = {
  code: number;
  message: string;
  data: T;
};

/**
 * Read JSON from a fetch `Response`, verify HTTP + business `code`, return `data`.
 * Use for admin APIs that wrap payloads with `{ code, message, data }`.
 */
export async function parseRsj<T>(res: Response): Promise<T> {
  let body: RsjEnvelope<T> | null = null;
  try {
    body = (await res.json()) as RsjEnvelope<T>;
  } catch {
    throw new Error(`Invalid JSON (${res.status})`);
  }

  /** Many handlers return HTTP 200 with `rfj` (`code !== 0`); auth may return 401 with the same envelope shape. */
  if (body.code !== RSJ_OK) {
    throw new Error(body.message || "Request failed");
  }
  if (!res.ok) {
    throw new Error(body.message || `HTTP ${res.status}`);
  }
  return body.data;
}
