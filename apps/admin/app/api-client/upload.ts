export type UploadResult = {
  path: string;
  fileName?: string;
};

export type UploadProgressCallback = (loaded: number, total: number) => void;

async function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png", 1.0),
  );
  if (!blob) throw new Error("Failed to create image blob");
  return blob;
}

export async function uploadFile(
  fileOrCanvas: Blob | File | HTMLCanvasElement,
  pathPrefix?: string,
): Promise<UploadResult> {
  let blob: Blob;
  let fileName = "file.png";

  if (fileOrCanvas instanceof HTMLCanvasElement) {
    blob = await toBlob(fileOrCanvas);
  } else {
    blob = fileOrCanvas;
    if (blob instanceof File) {
      fileName = blob.name;
    }
  }

  const formData = new FormData();
  formData.append("file", blob, fileName);
  if (pathPrefix) {
    formData.append("pathPrefix", pathPrefix);
  }

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message || "Upload failed");
  }

  const result = (await response.json()) as { code: number; data?: UploadResult; message?: string };
  if (result.code !== 0) {
    throw new Error(result.message || "Upload failed");
  }

  return result.data as UploadResult;
}

export async function uploadFileWithProgress(
  file: File,
  onProgress?: UploadProgressCallback,
  pathPrefix?: string,
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload", true);
    xhr.withCredentials = true;

    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          onProgress(event.loaded, event.total);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const body = JSON.parse(xhr.responseText) as {
            code?: number;
            data?: UploadResult;
            message?: string;
          };
          if (body.code !== 0) {
            reject(new Error(body.message ?? "Upload failed"));
            return;
          }
          resolve(body.data as UploadResult);
        } catch {
          reject(new Error("Upload failed"));
        }
      } else {
        reject(new Error(xhr.status === 401 ? "Not logged in" : "Upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));

    const formData = new FormData();
    formData.append("file", file);
    if (pathPrefix) {
      formData.append("pathPrefix", pathPrefix);
    }
    xhr.send(formData);
  });
}

export async function uploadAvatar(
  userId: string | number | undefined,
  canvas: HTMLCanvasElement,
): Promise<string> {
  const blob = await toBlob(canvas);
  const formData = new FormData();
  formData.append("file", blob, "avatar.png");
  formData.append("pathPrefix", `avatars/${userId}/`);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message || "Upload failed");
  }

  const result = (await response.json()) as { code: number; data?: UploadResult; message?: string };
  if (result.code !== 0) {
    throw new Error(result.message || "Upload failed");
  }

  return (result.data as UploadResult).path;
}
