import { Descriptions, message, Spin, Tag } from "antd";
import dayjs from "dayjs";
import { useCallback, useRef, useState } from "react";

import type { AdminSysUserInfo } from "~/api-client/queries/system-user";
import { useUpdateProfileAccount } from "~/api-client/queries/profile-account";
import { Cropper } from "~/components/common/Copper";

function fmt(value: string | null | undefined) {
  if (value == null) return "—";
  const s = String(value).trim();
  return s !== "" ? s : "—";
}

function formatDateTime(value: string | undefined) {
  if (!value) return "—";
  const d = dayjs(value);
  return d.isValid() ? d.format("YYYY-MM-DD HH:mm:ss") : "—";
}

function statusTag(status: number | undefined) {
  if (status === 1) return <Tag color="success">正常</Tag>;
  if (status === 0) return <Tag>停用</Tag>;
  return <Tag>—</Tag>;
}

export function BasicInfoDescriptions(props: {
  userInfo: AdminSysUserInfo | null | undefined;
  loading?: boolean;
}) {
  const { userInfo, loading } = props;
  const { mutateAsync: updateAvatar, isPending: isUpdating } = useUpdateProfileAccount();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setImageSrc(dataUrl);
      setCropperOpen(true);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  }, []);

  const getAuthHeader = () => {
    if (typeof localStorage === "undefined") return "";
    return "bearer " + (localStorage.getItem("token") ?? "");
  };

  const uploadCroppedImage = useCallback(
    async (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;

      setIsUploading(true);
      try {
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, "image/png", 1.0);
        });

        if (!blob) {
          throw new Error("Failed to create image blob");
        }

        const formData = new FormData();
        formData.append("file", blob, "avatar.png");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          headers: {
            authorization: getAuthHeader(),
          },
          credentials: "include",
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => ({}))) as { message?: string };
          throw new Error(data.message || "Upload failed");
        }

        const result = (await response.json()) as { data?: { path?: string } };
        const avatarUrl = result.data?.path;

        if (!avatarUrl) {
          throw new Error("Invalid response: missing path");
        }

        await updateAvatar({ avatar: avatarUrl });
        message.success("头像更新成功");
      } catch (err) {
        message.error(err instanceof Error ? err.message : "上传失败");
      } finally {
        setIsUploading(false);
        setCropperOpen(false);
      }
    },
    [updateAvatar],
  );

  if (loading && !userInfo) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 32, paddingBottom: 32 }}>
        <Spin />
      </div>
    );
  }

  const u = userInfo;

  return (
    <>
      <Descriptions
        bordered
        size="middle"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
        styles={{
          label: {
            width: 112,
            whiteSpace: "nowrap",
            verticalAlign: "top",
          },
          content: { wordBreak: "break-word" },
        }}
      >
        <Descriptions.Item label="头像" span={2}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handleSelectImage}
            disabled={isUpdating || isUploading}
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 4,
              border: "1px dashed #d9d9d9",
              borderRadius: 8,
              cursor: isUpdating || isUploading ? "not-allowed" : "pointer",
              background: "transparent",
              opacity: isUpdating || isUploading ? 0.6 : 1,
            }}
          >
            {isUpdating || isUploading ? (
              <Spin size="small" />
            ) : (
              <>
                <span style={{ fontSize: 20 }}>+</span>
                <span style={{ fontSize: 12 }}>更换</span>
              </>
            )}
          </button>
          {u?.avatar && (
            <img
              src={u.avatar}
              alt="avatar"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                marginLeft: 12,
                objectFit: "cover",
              }}
            />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="用户名">{fmt(u?.name)}</Descriptions.Item>
        <Descriptions.Item label="昵称">{fmt(u?.nickname)}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{fmt(u?.email)}</Descriptions.Item>
        <Descriptions.Item label="手机号">{fmt(u?.phone)}</Descriptions.Item>
        <Descriptions.Item label="部门">{fmt(u?.department?.name)}</Descriptions.Item>
        <Descriptions.Item label="状态">{statusTag(u?.status)}</Descriptions.Item>
        <Descriptions.Item label="语言">{fmt(u?.locale)}</Descriptions.Item>
        <Descriptions.Item label="主题">{fmt(u?.theme)}</Descriptions.Item>
        <Descriptions.Item label="备注" span={2}>
          {fmt(u?.remark)}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">{formatDateTime(u?.createdAt)}</Descriptions.Item>
        <Descriptions.Item label="更新时间">{formatDateTime(u?.updatedAt)}</Descriptions.Item>
      </Descriptions>

      {imageSrc && (
        <Cropper
          open={cropperOpen}
          imageSrc={imageSrc}
          aspect={1}
          circular
          onOk={uploadCroppedImage}
          onCancel={() => {
            setCropperOpen(false);
            setImageSrc("");
          }}
        />
      )}
    </>
  );
}
