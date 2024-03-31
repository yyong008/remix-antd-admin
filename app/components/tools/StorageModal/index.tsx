// react
import { useEffect, useRef, useState } from "react";

// components
import * as _icons from "@ant-design/icons";
import { ModalForm, ProTable } from "@ant-design/pro-components";
import { Alert, Button, Progress, message } from "antd";

// lib
import { ajax } from "rxjs/ajax";
import { combineLatest } from "rxjs";

const { EditOutlined } = _icons;

const FileSizeLimit = 2; // MB

enum FileStatus {
  BeforeUpload,
  Uploading,
  Uploaded,
}

type StorageModalProps = {
  trigger?: React.ReactNode;
};

export function StorageModal(props: StorageModalProps) {
  const inputRef = useRef<HTMLInputElement>();
  const { trigger } = props;
  const [fileList, setFileList] = useState<any[]>();
  const chooseFileListRef: any[] = useRef<any>([]);

  useEffect(() => {
    return () => {
      chooseFileListRef.current = [];
      setFileList([]);
    };
  }, []);

  return (
    <ModalForm
      title="文件上传"
      onFinish={async (e) => {
        const files = chooseFileListRef.current?.map((file) => file) ?? [];

        const fileUpload$ = files.map((file) => {
          const formData = new FormData();
          formData.append("file", file.file);
          return ajax({
            method: "POST",
            url: `/api/upload`,
            body: formData,
            includeUploadProgress: true,
          });
        });

        combineLatest(fileUpload$).subscribe({
          next(fileuploads) {
            // 所有的已经完成？
            const newFiles = fileuploads.map((uploadInfo, index) => {
              const info = {
                ...(chooseFileListRef?.current?.[index] ?? []),
                progress: {
                  loaded: uploadInfo.originalEvent.loaded,
                  total: uploadInfo.originalEvent.total,
                },
              };
              return info;
            });

            setFileList(() => {
              return newFiles;
            });
          },
          error(e) {
            console.log(e);
          },
        });
      }}
      submitter={{
        searchConfig: {
          submitText: "开始上传",
        },
      }}
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      trigger={
        trigger ??
        ((
          <Button type={"primary"} icon={<EditOutlined />}>
            新建
          </Button>
        ) as any)
      }
    >
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
    </ModalForm>
  );
}
