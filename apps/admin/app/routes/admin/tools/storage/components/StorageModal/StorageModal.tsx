import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Progress, Typography } from "antd";
import { useCallback, useState } from "react";

import { ModalForm } from "~/components/pro-form-kit";

import { ChoiceFileButton } from "./ChoiceFileButton";
import type { PendingUploadRow } from "./pending-file-types";
import { formatFileSize, revokePreviewUrls } from "./pending-file-types";

import "./storage-modal.css";

const FileSizeLimit = 2; // MB
const MaxFiles = 10;

type StorageModalProps = {
  trigger?: React.ReactNode;
  refetch: () => void;
};

export function StorageModal(props: StorageModalProps) {
  const { trigger } = props;
  const [fileList, setFileList] = useState<PendingUploadRow[]>([]);
  const [uploadLocked, setUploadLocked] = useState(false);

  const resetAll = useCallback(() => {
    setFileList((prev) => {
      revokePreviewUrls(prev);
      return [];
    });
    setUploadLocked(false);
  }, []);

  const uploadFile = (
    file: File,
    token: string | null,
    onProgress: (loaded: number, total: number) => void,
  ) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload", true);
      xhr.withCredentials = true;
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          onProgress(event.loaded, event.total);
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const body = JSON.parse(xhr.responseText) as { code?: number; message?: string };
            if (body.code !== 0) {
              reject(new Error(body.message ?? "上传失败"));
              return;
            }
            resolve();
          } catch {
            reject(new Error("响应解析失败"));
          }
        } else {
          reject(new Error(xhr.status === 401 ? "未登录或会话已过期" : "上传失败"));
        }
      };
      xhr.onerror = () => reject(new Error("网络错误"));
      const formData = new FormData();
      formData.append("file", file);
      xhr.send(formData);
    });
  };

  const totalBytes = fileList.reduce((sum, r) => sum + r.size, 0);
  const uploadCount = fileList.filter((f) => f.phase === "uploading").length;
  const successCount = fileList.filter((f) => f.phase === "success").length;

  return (
    <ModalForm
      title="上传文件"
      width={560}
      onOpenChange={(open) => {
        if (!open) {
          resetAll();
        }
      }}
      onFinish={async () => {
        const rows = fileList;
        if (!rows.length) {
          message.warning("请先添加要上传的文件");
          return false;
        }

        const token = localStorage.getItem("token");
        setUploadLocked(true);

        setFileList((prev) =>
          prev.map((r) => ({ ...r, phase: "uploading" as const, errorMessage: undefined })),
        );

        let failCount = 0;

        try {
          await Promise.all(
            rows.map(async (row, index) => {
              try {
                await uploadFile(row.file, token, (loaded, total) => {
                  setFileList((prev) => {
                    const next = [...prev];
                    if (!next[index]) return next;
                    next[index] = {
                      ...next[index],
                      progress: { loaded, total },
                    };
                    return next;
                  });
                });
                setFileList((prev) => {
                  const next = [...prev];
                  if (!next[index]) return next;
                  next[index] = { ...next[index], phase: "success" };
                  return next;
                });
              } catch (e) {
                failCount++;
                const msg = e instanceof Error ? e.message : "上传失败";
                setFileList((prev) => {
                  const next = [...prev];
                  if (!next[index]) return next;
                  next[index] = {
                    ...next[index],
                    phase: "error",
                    errorMessage: msg,
                  };
                  return next;
                });
              }
            }),
          );
        } finally {
          setUploadLocked(false);
        }

        if (failCount > 0) {
          message.error(`有 ${failCount} 个文件上传失败`, 4);
          return false;
        }

        message.success("上传完成");
        props.refetch();
        return true;
      }}
      submitter={{
        searchConfig: {
          submitText: "开始上传",
        },
        submitButtonProps: {
          disabled: !fileList.length || uploadLocked,
        },
      }}
      modalProps={{
        destroyOnHidden: true,
        className: "rr-storage-upload-modal",
        maskClosable: !uploadLocked,
        closable: !uploadLocked,
        styles: { body: { padding: "16px 20px" } },
      }}
      trigger={
        trigger ??
        ((
          <Button type="primary" icon={<PlusOutlined />}>
            上传文件
          </Button>
        ) as any)
      }
    >
      {/* 文件数量限制提示 */}
      <div style={{ marginBottom: 16, color: "#666", fontSize: 13 }}>
        单文件 ≤ {FileSizeLimit}MB，最多 {MaxFiles} 个文件
      </div>

      {/* 操作栏 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 0",
          borderBottom: "1px solid #f0f0f0",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ChoiceFileButton
            fileListLength={fileList.length}
            disabled={uploadLocked}
            setFileList={setFileList}
          />
          {fileList.length > 0 && (
            <Button size="small" onClick={resetAll} disabled={uploadLocked}>
              清空
            </Button>
          )}
        </div>
        {fileList.length > 0 && (
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {fileList.length} 个文件 · {formatFileSize(totalBytes)}
          </Typography.Text>
        )}
      </div>

      {/* 上传进度概览 */}
      {uploadLocked && (
        <div
          style={{ marginBottom: 12, padding: "8px 12px", background: "#f5f5f5", borderRadius: 4 }}
        >
          <Typography.Text style={{ fontSize: 12, color: "#666" }}>
            上传中... {uploadCount} 个文件
          </Typography.Text>
        </div>
      )}
      {successCount > 0 && !uploadLocked && (
        <div
          style={{ marginBottom: 12, padding: "8px 12px", background: "#f6ffed", borderRadius: 4 }}
        >
          <Typography.Text style={{ fontSize: 12, color: "#52c41a" }}>
            已完成 {successCount} 个文件
          </Typography.Text>
        </div>
      )}

      {/* 文件列表 */}
      <div style={{ maxHeight: 320, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
              <th
                style={{
                  padding: "8px 0",
                  textAlign: "left",
                  fontSize: 12,
                  color: "#999",
                  fontWeight: 400,
                }}
              >
                文件名
              </th>
              <th
                style={{
                  padding: "8px 0",
                  textAlign: "right",
                  fontSize: 12,
                  color: "#999",
                  fontWeight: 400,
                  width: 80,
                }}
              >
                大小
              </th>
              <th
                style={{
                  padding: "8px 0",
                  textAlign: "center",
                  fontSize: 12,
                  color: "#999",
                  fontWeight: 400,
                  width: 80,
                }}
              >
                状态
              </th>
              <th
                style={{
                  padding: "8px 0",
                  textAlign: "center",
                  fontSize: 12,
                  color: "#999",
                  fontWeight: 400,
                  width: 48,
                }}
              >
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {fileList.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "32px 0", textAlign: "center" }}>
                  <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                    <InboxOutlined style={{ fontSize: 24, marginBottom: 8, display: "block" }} />
                    点击上方「选择文件」添加
                  </Typography.Text>
                </td>
              </tr>
            ) : (
              fileList.map((row, index) => (
                <FileRow
                  key={row.uid}
                  row={row}
                  index={index}
                  setFileList={setFileList}
                  uploadLocked={uploadLocked}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </ModalForm>
  );
}

function FileRow({
  row,
  index,
  setFileList,
  uploadLocked,
}: {
  row: PendingUploadRow;
  index: number;
  setFileList: React.Dispatch<React.SetStateAction<PendingUploadRow[]>>;
  uploadLocked: boolean;
}) {
  const phaseLabel: Record<string, { color: string; text: string }> = {
    pending: { color: "default", text: "待上传" },
    uploading: { color: "processing", text: "上传中" },
    success: { color: "success", text: "已完成" },
    error: { color: "error", text: "失败" },
  };

  const meta = phaseLabel[row.phase] ?? phaseLabel.pending;

  return (
    <tr style={{ borderBottom: "1px solid #f5f5f5" }}>
      <td style={{ padding: "10px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{row.name}</div>
        {row.phase === "uploading" && (
          <Progress
            percent={
              row.progress.total > 0
                ? Math.min(100, (row.progress.loaded / row.progress.total) * 100)
                : 0
            }
            size="small"
            status="active"
            style={{ margin: 0 }}
          />
        )}
        {row.phase === "error" && row.errorMessage && (
          <Typography.Text type="danger" style={{ fontSize: 12 }}>
            {row.errorMessage}
          </Typography.Text>
        )}
      </td>
      <td style={{ padding: "10px 0", textAlign: "right", fontSize: 12, color: "#999" }}>
        {formatFileSize(row.size)}
      </td>
      <td style={{ padding: "10px 0", textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 12,
            background:
              meta.color === "success" ? "#f6ffed" : meta.color === "error" ? "#fff2f0" : "#f5f5f5",
            color:
              meta.color === "success" ? "#52c41a" : meta.color === "error" ? "#ff4d4f" : "#999",
          }}
        >
          {meta.text}
        </span>
      </td>
      <td style={{ padding: "10px 0", textAlign: "center" }}>
        <Button
          type="text"
          danger
          size="small"
          onClick={() => {
            if (uploadLocked) return;
            if (row.previewUrl?.startsWith("blob:")) {
              try {
                URL.revokeObjectURL(row.previewUrl);
              } catch {
                /* ignore */
              }
            }
            setFileList((prev) => prev.filter((_, i) => i !== index));
          }}
        />
      </td>
    </tr>
  );
}
