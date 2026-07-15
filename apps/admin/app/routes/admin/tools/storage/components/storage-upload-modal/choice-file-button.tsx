import { CloudUploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRef } from "react";
import { m } from "~/paraglide/messages";
import type { PendingUploadRow } from "./pending-file-types";

const FileSizeLimit = 2;
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

            if (hitLimit) {
            }
            if (skippedBig > 0) {
            }

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
        {m.tools_storage_upload_select()}
      </Button>
    </>
  );
}
