// react
import { useRef, useState } from "react";

// components
import * as _icons from "@ant-design/icons";
import { ModalForm, ProTable } from "@ant-design/pro-components";
import { Alert, Button, Progress, message } from "antd";

// lib
import { ajax } from "rxjs/ajax";

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

  return (
    <ModalForm
      title="文件上传"
      onFinish={async (e) => {
        const files = fileList?.map((file) => file) ?? [];
        const formData = new FormData();
        formData.append("file", files[0].file);

        ajax({
          method: "POST",
          url: `/api/upload`,
          body: formData,
          includeUploadProgress: true,
        }).subscribe({
          error(error) {
            console.log(error);
          },
          next(value) {
            console.log("xxx", value);
          },
        });
        // return true;
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
          const _chooseFileList: any[] = [];
          Array.from(files)?.forEach((file: any) => {
            if (file.size > 1024 * 1024 * 2) {
              return message.error(
                `单个文件不超过${FileSizeLimit}MB，最多只能上传10个文件`,
              );
            }
            _chooseFileList.push({
              file: file,
              url: URL.createObjectURL(file),
              name: file.name,
              size: file.size,
              type: file.type,
              status: FileStatus.BeforeUpload,
            });
          });
          setFileList(_chooseFileList);
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
              return (
                <div>
                  <div>{record.name}</div>
                  <Progress></Progress>
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
