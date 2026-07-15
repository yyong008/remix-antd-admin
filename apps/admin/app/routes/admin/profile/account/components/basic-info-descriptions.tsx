import dayjs from "dayjs";
import { m } from "~/paraglide/messages";
import { Cropper } from "~/components/common/Copper";
import { useCallback, useRef, useState } from "react";
import { Descriptions, message, Spin, Tag } from "antd";
import { useUserInfo } from "~/api-client/queries/system/system-user";
import { useUpdateProfileAccount } from "~/api-client/queries/profile/profile-account";

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
  if (status === 1) return <Tag color="success">{m.profile_account_status_active()}</Tag>;
  if (status === 0) return <Tag>{m.profile_account_status_disabled()}</Tag>;
  return <Tag>—</Tag>;
}

export function BasicInfoDescriptions() {
  const { data, isLoading } = useUserInfo();
  const userInfo = data?.userInfo;
  const updateProfile = useUpdateProfileAccount();
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

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      void message.error(m.profile_account_avatar_type_error());
      e.target.value = "";
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      void message.error(m.profile_account_avatar_max_size());
      e.target.value = "";
      return;
    }

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
        formData.append("pathPrefix", `avatars/${userInfo?.id}/`);

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

        await updateProfile.mutateAsync({ avatar: avatarUrl });
        message.success(m.profile_account_avatar_success());
      } catch (err) {
        message.error(err instanceof Error ? err.message : m.profile_account_avatar_failed());
      } finally {
        setIsUploading(false);
        setCropperOpen(false);
      }
    },
    [updateProfile, userInfo?.id],
  );

  if (isLoading && !userInfo) {
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
        <Descriptions.Item label={m.profile_account_avatar()} span={2}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {u?.avatar ? (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={u.avatar}
                alt="avatar"
                onClick={handleSelectImage}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: isUploading ? "not-allowed" : "pointer",
                  opacity: isUploading ? 0.6 : 1,
                }}
              />
              {isUploading && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.4)",
                  }}
                >
                  <Spin size="small" />
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSelectImage}
              disabled={isUploading}
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
                cursor: isUploading ? "not-allowed" : "pointer",
                background: "transparent",
                opacity: isUploading ? 0.6 : 1,
              }}
            >
              {isUploading ? (
                <Spin size="small" />
              ) : (
                <>
                  <span style={{ fontSize: 20 }}>+</span>
                  <span style={{ fontSize: 12 }}>{m.profile_account_avatar_change()}</span>
                </>
              )}
            </button>
          )}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_name()}>{fmt(u?.name)}</Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_nickname()}>
          {fmt(u?.nickname)}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_email()}>
          {fmt(u?.email)}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_phone()}>
          {fmt(u?.phone)}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_department()}>
          {fmt(u?.department?.name)}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_status()}>
          {statusTag(u?.status)}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_locale()}>
          {fmt(u?.locale)}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_theme()}>
          {fmt(u?.theme)}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_remark()} span={2}>
          {fmt(u?.remark)}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_created_at()}>
          {formatDateTime(u?.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label={m.profile_account_field_updated_at()}>
          {formatDateTime(u?.updatedAt)}
        </Descriptions.Item>
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
