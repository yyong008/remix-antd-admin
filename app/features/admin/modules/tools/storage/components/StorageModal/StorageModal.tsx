import { EditOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Empty, message, Popconfirm, Space, Typography } from "antd";
import { useCallback, useState } from "react";

import { ModalForm } from "~/components/pro-form-kit";

import { AdminTable } from "~/components/admin-table";

import { ChoiceFileButton } from "./ChoiceFileButton";
import { createModalColumns } from "./createModalColumns";
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

  return (
    <ModalForm
      title={
        (
          <Space>
            <span>上传到对象存储</span>
            <Typography.Text type="secondary" style={{ fontSize: 14, fontWeight: 400 }}>
              本地 R2 · 队列上传
            </Typography.Text>
          </Space>
        ) as any
      }
      width={720}
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
          message.error(
            `有 ${failCount} 个文件上传失败，请查看列表中的错误说明，移除或重试后再上传。`,
            6,
          );
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
        styles: { body: { paddingTop: 12 } },
      }}
      trigger={
        trigger ??
        ((
          <Button type="primary" icon={<EditOutlined />}>
            新建
          </Button>
        ) as any)
      }
    >
      <Alert
        className="rr-storage-upload-modal__intro"
        message="上传说明"
        description={`单个文件不超过 ${FileSizeLimit}MB，单次队列最多 ${MaxFiles} 个。关闭弹窗或上传成功后会自动清空待传列表并释放本地预览内存。`}
        type="info"
        showIcon
      />

      <div className="rr-storage-upload-modal__toolbar">
        <Space wrap>
          <ChoiceFileButton
            fileListLength={fileList.length}
            disabled={uploadLocked}
            setFileList={setFileList}
          />
          <Popconfirm
            title="清空待传列表？"
            description="将移除已选文件并释放本地预览，未上传的内容不会保存。"
            okText="清空"
            cancelText="取消"
            disabled={uploadLocked || fileList.length === 0}
            onConfirm={() => resetAll()}
          >
            <Button disabled={uploadLocked || fileList.length === 0}>清空列表</Button>
          </Popconfirm>
        </Space>
        <div className="rr-storage-upload-modal__summary">
          {fileList.length > 0 ? (
            <>
              已选 <strong>{fileList.length}</strong> 个文件 · 合计约{" "}
              <strong>{formatFileSize(totalBytes)}</strong>
            </>
          ) : (
            <span>尚未选择文件</span>
          )}
        </div>
      </div>

      <Card size="small" className="rr-storage-upload-modal__card" variant="borderless">
        <AdminTable<PendingUploadRow>
          search={false}
          pagination={false}
          size="small"
          rowKey="uid"
          className="rr-storage-upload-modal__table"
          dataSource={fileList}
          columns={createModalColumns({ setFileList, uploadLocked }) as any}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Typography.Text type="secondary">
                    点击「选择文件」添加本地文件
                    <br />
                    <Typography.Text type="secondary" style={{ fontSize: 12, opacity: 0.85 }}>
                      支持多选，单次最多 {MaxFiles} 个 · 单文件 ≤ {FileSizeLimit}MB
                    </Typography.Text>
                  </Typography.Text>
                }
              />
            ),
          }}
        />
      </Card>
    </ModalForm>
  );
}
