import { ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";

export function FormItems() {
  const { t } = useTranslation("link");
  return (
    <>
      <ProFormText
        name="name"
        label={t("category.modal.create.form.name.label")}
        placeholder={t("category.modal.create.form.name.placeholder")}
        rules={[
          {
            required: true,
            message: t("category.modal.create.form.name.required"),
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        label={t("category.modal.create.form.description.label")}
        placeholder={t("category.modal.create.form.description.placeholder")}
        rules={[
          {
            required: false,
            message: t("category.modal.create.form.description.required"),
          },
        ]}
      />
    </>
  );
}
