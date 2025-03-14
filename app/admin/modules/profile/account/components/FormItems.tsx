import { ProFormDigit, ProFormText, ProFormUploadButton } from "@ant-design/pro-components";
import { message } from "antd";
import { useTranslation } from "react-i18next";

export function FormItems({ isEdit }: { isEdit: boolean }) {
  const { t } = useTranslation("account");
  return (
    <>
      <ProFormUploadButton
        disabled={!isEdit}
        label={t("avatar")}
        name="avatar"
        placeholder={t("avatar.placeholder")}
        listType="picture-card"
        action="/api/v1/admin/upload/avatar"
        accept="image/*.png"
        fieldProps={{
          onChange(info) {
            if (info.file.status === "error") {
              message.error(info.file.response?.message);
            }
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }}
        max={1}
        rules={[
          {
            required: false,
            message: t("form.items.image.required"),
          },
        ]}
      />
      <ProFormText label={t("name")} name="name" />
      <ProFormText label={t("nickname")} name="nickname" />
      <ProFormText label={t("email")} name="email" />
      <ProFormText label={t("remark")} name="remark" />
      <ProFormText label={t("lang")} name="lang" />
      <ProFormText label={t("theme")} name="theme" />
      <ProFormDigit label={t("phone")} name="phone" />
      <ProFormText label={t("createdAt")} name="createdAt" />
      <ProFormText label={t("department")} name="department" />
    </>
  );
}
