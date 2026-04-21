import { DeleteOutlined, FileImageOutlined, FileOutlined } from "@ant-design/icons";
import { Button, Progress, Tag, Typography } from "antd";

import type { PendingUploadRow } from "./pending-file-types";
import { formatFileSize } from "./pending-file-types";

const phaseLabel: Record<string, { color: string; text: string }> = {
  pending: { color: "default", text: "待上传" },
  uploading: { color: "processing", text: "上传中" },
  success: { color: "success", text: "已完成" },
  error: { color: "error", text: "失败" },
};

function isImageType(mime: string) {
  return mime.startsWith("image/");
}

export function createModalColumns({
  setFileList,
  uploadLocked,
}: {
  setFileList: React.Dispatch<React.SetStateAction<PendingUploadRow[]>>;
  uploadLocked: boolean;
}) {
  return [
    {
      title: "预览",
      width: 72,
      align: "center" as const,
      render(_: unknown, record: PendingUploadRow) {
        if (isImageType(record.type) && record.previewUrl) {
          return (
            <img className="rr-storage-upload-modal__preview" src={record.previewUrl} alt="" />
          );
        }
        return (
          <div className="rr-storage-upload-modal__file-icon">
            {record.type.includes("image") ? <FileImageOutlined /> : <FileOutlined />}
          </div>
        );
      },
    },
    {
      dataIndex: "name",
      title: "文件",
      ellipsis: true,
      render(_: unknown, record: PendingUploadRow) {
        return (
          <div>
            <Typography.Text strong style={{ fontSize: 13 }}>
              {record.name}
            </Typography.Text>
            {record.phase === "uploading" ? (
              <Progress
                percent={
                  record.progress.total > 0
                    ? Math.min(100, (record.progress.loaded / record.progress.total) * 100)
                    : 0
                }
                size="small"
                status="active"
                showInfo
              />
            ) : null}
            {record.phase === "error" && record.errorMessage ? (
              <Typography.Text
                type="danger"
                style={{ fontSize: 12, display: "block", marginTop: 4 }}
              >
                {record.errorMessage}
              </Typography.Text>
            ) : null}
          </div>
        );
      },
    },
    {
      title: "大小",
      width: 100,
      render(_: unknown, record: PendingUploadRow) {
        return (
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {formatFileSize(record.size)}
          </Typography.Text>
        );
      },
    },
    {
      title: "状态",
      width: 96,
      render(_: unknown, record: PendingUploadRow) {
        const meta = phaseLabel[record.phase] ?? phaseLabel.pending;
        return (
          <Tag color={meta.color} bordered={false}>
            {meta.text}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      width: 72,
      align: "center" as const,
      render(_: unknown, __: PendingUploadRow, index: number) {
        const disabled = uploadLocked;
        return (
          <Button
            type="text"
            danger
            size="small"
            icon={<DeleteOutlined />}
            disabled={disabled}
            aria-label="移除"
            onClick={() => {
              if (disabled) return;
              setFileList((prev) => {
                const row = prev[index];
                if (row?.previewUrl?.startsWith("blob:")) {
                  try {
                    URL.revokeObjectURL(row.previewUrl);
                  } catch {
                    /* ignore */
                  }
                }
                return prev.filter((_, i) => i !== index);
              });
            }}
          />
        );
      },
    },
  ];
}
