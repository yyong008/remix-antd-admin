import { Alert, Button, Progress, message } from "antd";
import { useEffect, useRef, useState } from "react";

import { ProTable } from "@ant-design/pro-components";

const FileSizeLimit = 2; // MB

enum FileStatus {
  BeforeUpload,
  Uploading,
  Uploaded,
}

type StorageModalProps = {
  trigger?: React.ReactNode;
};

export function StorageModalForm(props: StorageModalProps) {
  const inputRef = useRef<HTMLInputElement>();
  const [fileList, setFileList] = useState<any[]>();
  const chooseFileListRef = useRef<any[]>([]);

  const reset = () => {
    chooseFileListRef.current = [];
    setFileList([]);
  };
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <>
      <input
        ref={inputRef as any}
        type="file"
        multiple={true}
        style={{ display: "none" }}
        onChange={(e) => {
          const files = inputRef.current?.files ?? [];

          Array.from(files)?.forEach((file: any) => {
            if (file.size > 1024 * 1024 * 2) {
              return message.error(
                `单个文件不超过${FileSizeLimit}MB，最多只能上传10个文件`,
              );
            }
            chooseFileListRef.current?.push({
              file: file,
              url: URL.createObjectURL(file),
              name: file.name,
              size: file.size,
              type: file.type,
              status: FileStatus.BeforeUpload,
              progress: {
                loaded: 0,
                total: 0,
              },
              isError: false,
              isCompleted: false,
            });
          });
          setFileList(chooseFileListRef.current);
        }}
      />
      <Alert
        message={`单个文件不超过${FileSizeLimit}MB，最多只能上传10个文件`}
        type="info"
        showIcon
      />
      <ProTable
        search={false}
        dataSource={fileList}
        columns={[
          {
            dataIndex: "url",
            title: "地址",
            ellipsis: true,
          },
          {
            dataIndex: "name",
            title: "文件名",
            width: 260,
            render(_, record) {
              const percent =
                (record.progress.loaded / record.progress.total) * 100;
              return (
                <div>
                  <div>{record.name}</div>
                  <Progress percent={percent}></Progress>
                </div>
              );
            },
          },
          {
            dataIndex: "size",
            title: "文件大小",
          },
          {
            dataIndex: "state",
            title: "状态",
          },
          {
            title: "操作",
            render(_, record, index) {
              return (
                <div
                  onClick={() => {
                    setFileList(fileList?.filter((_, i) => i !== index));
                  }}
                >
                  删除
                </div>
              );
            },
          },
        ]}
        toolBarRender={() => [
          <Button
            key="show"
            type="primary"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            选择文件
          </Button>,
        ]}
      />
    </>
  );
}
