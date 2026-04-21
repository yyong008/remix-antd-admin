import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

import { useRef } from "react";

import type { PendingUploadRow } from "./pending-file-types";

const FileSizeLimit = 2; // MB
const MaxFiles = 10;

type ChoiceFileButtonProps = {
  fileListLength: number;
  disabled?: boolean;
  setFileList: React.Dispatch<React.SetStateAction<PendingUploadRow[]>>;
};

export function ChoiceFileButton({ fileListLength, disabled, setFileList }: ChoiceFileButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const atLimit = fileListLength >= MaxFiles;
  const mergedDisabled = disabled || atLimit;

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        disabled={mergedDisabled}
        onChange={(e) => {
          const picked = e.target.files;
          if (!picked?.length) return;

          const files = Array.from(picked);
          e.target.value = "";

          setFileList((prev) => {
            const next: PendingUploadRow[] = [...prev];
            let hitLimit = false;
            let skippedBig = 0;

            for (const file of files) {
              if (next.length >= MaxFiles) {
                hitLimit = true;
                break;
              }
              if (file.size > 1024 * 1024 * FileSizeLimit) {
                skippedBig++;
                continue;
              }
              const previewUrl = URL.createObjectURL(file);
              next.push({
                uid: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
                file,
                previewUrl,
                name: file.name,
                size: file.size,
                type: file.type || "application/octet-stream",
                progress: { loaded: 0, total: file.size || 1 },
                phase: "pending",
              });
            }

            queueMicrotask(() => {
              if (hitLimit) {
                message.warning(`单次最多添加 ${MaxFiles} 个文件`);
              }
              if (skippedBig > 0) {
                message.warning(`${skippedBig} 个文件超过 ${FileSizeLimit}MB，已跳过`);
              }
            });

            return next;
          });
        }}
      />
      <Button
        type="primary"
        icon={<CloudUploadOutlined />}
        disabled={mergedDisabled}
        onClick={() => {
          if (!mergedDisabled) inputRef.current?.click();
        }}
      >
        {atLimit ? "已达上限" : "选择文件"}
      </Button>
    </>
  );
}
