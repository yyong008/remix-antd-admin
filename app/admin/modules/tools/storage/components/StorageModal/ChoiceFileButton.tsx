import { Button, message } from "antd";

import { useRef } from "react";

const FileSizeLimit = 2; // MB

enum FileStatus {
  BeforeUpload,
  Uploading,
  Uploaded,
}

export function ChoiceFileButton({ fileList, setFileList }: any) {
  const inputRef = useRef<HTMLInputElement>();
  const chooseFileListRef = useRef<any[]>([]);
  return (
    <>
      <input
        ref={inputRef as any}
        type="file"
        multiple={true}
        style={{ display: "none" }}
        onChange={() => {
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
      <Button
        key="show"
        type="primary"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        选择文件
      </Button>
    </>
  );
}
