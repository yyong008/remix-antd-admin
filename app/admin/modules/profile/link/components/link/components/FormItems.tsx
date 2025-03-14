import { ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";

export function FormItems({ userCategoryAll }: { userCategoryAll: any }) {
  const { t } = useTranslation("link");
  return (
    <>
      
      <ProFormText
        name="name"
        label={t("link.modal.create.form.name.label")}
        placeholder={t("link.modal.create.form.name.placeholder")}
        rules={[
          {
            required: true,
            message: t("link.modal.create.form.name.required"),
          },
        ]}
      />
      <ProFormText
        name="url"
        label={t("link.modal.create.form.url.label")}
        placeholder={t("link.modal.create.form.url.placeholder")}
        rules={[
          {
            required: true,
            message: t("link.modal.create.form.url.required"),
          },
        ]}
      />
      <ProFormSelect
        name="categoryId"
        label={t("link.modal.create.form.category.label")}
        placeholder={t("link.modal.create.form.category.placeholder")}
        rules={[
          {
            required: true,
            message: t("link.modal.create.form.category.required"),
          },
        ]}
        options={userCategoryAll.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))}
      />
      <ProFormTextArea
        name="description"
        label={t("link.modal.create.form.description.label")}
        placeholder={t("link.modal.create.form.description.placeholder")}
        rules={[
          {
            required: false,
            message: t("link.modal.create.form.description.required"),
          },
        ]}
      />
    </>
  );
}
