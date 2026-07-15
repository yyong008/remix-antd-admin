export type PendingUploadPhase = "pending" | "uploading" | "success" | "error";

export type PendingUploadRow = {
  uid: string;
  file: File;
  /** blob: URL for preview; revoke on remove/reset */
  previewUrl: string;
  name: string;
  size: number;
  type: string;
  progress: { loaded: number; total: number };
  phase: PendingUploadPhase;
  errorMessage?: string;
};

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function revokePreviewUrls(rows: PendingUploadRow[]) {
  for (const row of rows) {
    if (row.previewUrl?.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(row.previewUrl);
      } catch {
        /* ignore */
      }
    }
  }
}
