import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Progress, Typography } from "antd";
import { useCallback, useState } from "react";

import { ModalForm } from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";
import { uploadFileWithProgress } from "~/api-client/upload";

import { ChoiceFileButton } from "./choice-file-button";
import type { PendingUploadRow } from "./pending-file-types";
import { formatFileSize, revokePreviewUrls } from "./pending-file-types";

import "./storage-upload-modal.css";

const FileSizeLimit = 2;
const MaxFiles = 10;

type StorageModalProps = {
  trigger?: React.ReactNode;
  refetch: () => void;
};

export function StorageUploadModal(props: StorageModalProps) {
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

  const totalBytes = fileList.reduce((sum, r) => sum + r.size, 0);
  const uploadCount = fileList.filter((f) => f.phase === "uploading").length;
  const successCount = fileList.filter((f) => f.phase === "success").length;

  return (
    <ModalForm
      title={m.tools_storage_upload_modal_title()}
      width={560}
      onOpenChange={(open) => {
        if (!open) {
          resetAll();
        }
      }}
      onFinish={async () => {
        const rows = fileList;
        if (!rows.length) {
          message.warning(m.tools_storage_upload_no_files());
          return false;
        }

        setUploadLocked(true);

        setFileList((prev) =>
          prev.map((r) => ({ ...r, phase: "uploading" as const, errorMessage: undefined })),
        );

        let failCount = 0;

        try {
          await Promise.all(
            rows.map(async (row, index) => {
              try {
                await uploadFileWithProgress(row.file, (loaded, total) => {
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
                const msg = e instanceof Error ? e.message : m.tools_storage_toast_delete_failed();
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
          message.error(m.tools_storage_upload_failed({ count: failCount }), 4);
          return false;
        }

        message.success(m.tools_storage_upload_toast_completed());
        props.refetch();
        return true;
      }}
      submitter={{
        searchConfig: {
          submitText: m.tools_storage_upload_start(),
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
            {m.tools_storage_upload()}
          </Button>
        ) as any)
      }
    >
      <div style={{ marginBottom: 16, color: "#666", fontSize: 13 }}>
        {m.tools_storage_upload_limit({ size: FileSizeLimit, count: MaxFiles })}
      </div>

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
              {m.tools_storage_upload_clear()}
            </Button>
          )}
        </div>
        {fileList.length > 0 && (
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {fileList.length} {m.tools_storage_upload_column_size()} · {formatFileSize(totalBytes)}
          </Typography.Text>
        )}
      </div>

      {uploadLocked && (
        <div
          style={{ marginBottom: 12, padding: "8px 12px", background: "#f5f5f5", borderRadius: 4 }}
        >
          <Typography.Text style={{ fontSize: 12, color: "#666" }}>
            {m.tools_storage_upload_uploading()}{" "}
            {m.tools_storage_upload_completed({ count: uploadCount })}
          </Typography.Text>
        </div>
      )}
      {successCount > 0 && !uploadLocked && (
        <div
          style={{ marginBottom: 12, padding: "8px 12px", background: "#f6ffed", borderRadius: 4 }}
        >
          <Typography.Text style={{ fontSize: 12, color: "#52c41a" }}>
            {m.tools_storage_upload_completed({ count: successCount })}
          </Typography.Text>
        </div>
      )}

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
                {m.tools_storage_upload_column_filename()}
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
                {m.tools_storage_upload_column_size()}
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
                {m.tools_storage_upload_column_status()}
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
                {m.tools_storage_upload_column_action()}
              </th>
            </tr>
          </thead>
          <tbody>
            {fileList.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "32px 0", textAlign: "center" }}>
                  <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                    <InboxOutlined style={{ fontSize: 24, marginBottom: 8, display: "block" }} />
                    {m.tools_storage_upload_empty_hint()}
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
    pending: { color: "default", text: m.tools_storage_upload_status_pending() },
    uploading: { color: "processing", text: m.tools_storage_upload_status_uploading() },
    success: { color: "success", text: m.tools_storage_upload_status_success() },
    error: { color: "error", text: m.tools_storage_upload_status_error() },
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
