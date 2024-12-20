import { Alert, Button, message } from "antd";
import { ModalForm, ProTable } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";

import { ChoiceFileButton } from "./ChoiceFileButton";
import { EditOutlined } from "@ant-design/icons";
import { ajax } from "rxjs/ajax";
import { combineLatest } from "rxjs";
import { createModalColumns } from "./createModalColumns";

const FileSizeLimit = 2; // MB

type StorageModalProps = {
  trigger?: React.ReactNode;
  refetch: any;
};

export function StorageModal(props: StorageModalProps) {
  const { trigger } = props;
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
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
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
          complete() {
            message.info("upload success");
            props?.refetch();
          },
        });
      }}
      submitter={{
        searchConfig: {
          submitText: "开始上传",
        },
        submitButtonProps: {
          disabled: chooseFileListRef.current.length <= 0,
        },
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          reset();
        },
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
      <Alert
        message={`单个文件不超过${FileSizeLimit}MB，最多只能上传10个文件`}
        type="info"
        showIcon
      />
      <ProTable
        search={false}
        dataSource={fileList}
        columns={createModalColumns({ setFileList, fileList })}
        toolBarRender={() => [
          <ChoiceFileButton
            key="choice-file"
            fileList={fileList}
            setFileList={setFileList}
          />,
        ]}
      />
    </ModalForm>
  );
}
