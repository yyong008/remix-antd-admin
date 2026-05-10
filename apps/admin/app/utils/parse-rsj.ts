export const RSJ_OK = 0;

export type RsjEnvelope<T> = {
  code: number;
  message: string;
  data: T;
};

export async function parseRsj<T>(res: Response): Promise<T> {
  let body: RsjEnvelope<T> | null = null;
  try {
    body = (await res.json()) as RsjEnvelope<T>;
  } catch {
    throw new Error(`Invalid JSON (${res.status})`);
  }

  if (body.code !== RSJ_OK) {
    throw new Error(body.message || "Request failed");
  }
  if (!res.ok) {
    throw new Error(body.message || `HTTP ${res.status}`);
  }
  return body.data;
}
