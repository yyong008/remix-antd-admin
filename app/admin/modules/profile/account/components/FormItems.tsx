import { ProFormDigit, ProFormText, ProFormUploadButton } from "@ant-design/pro-components";
import { message } from "antd";
import { useTranslation } from "react-i18next";

export function FormItems({ isEdit }: { isEdit: boolean }) {
  const { t } = useTranslation();
  return (
    <>
      <ProFormUploadButton
        disabled={!isEdit}
        label={`头像`}
        name="avatar"
        placeholder={`请上传头像`}
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
      <ProFormText label="用户名" name="name" />
      <ProFormText label="昵称" name="nickname" />
      <ProFormText label="邮箱" name="email" />
      <ProFormText label="备注" name="remark" />
      <ProFormText label="语言" name="lang" />
      <ProFormText label="主题" name="theme" />
      <ProFormDigit label="手机号" name="phone" />
      <ProFormText label="创建时间" name="createdAt" />
      <ProFormText label="部门" name="department" />
    </>
  );
}
