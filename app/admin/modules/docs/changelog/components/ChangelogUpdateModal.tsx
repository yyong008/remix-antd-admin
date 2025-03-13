import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { EditOutlined } from "@ant-design/icons";
import { updateDoc } from "~/admin/apis/admin/docs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export function ChangelogUpdateModal({ record, refetch }: any) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("docs");
  const p = useColorPrimary()
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={t("modal.update.title")}
      loading={isLoading}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={<Button type="link" icon={<EditOutlined style={{ color: p.colorPrimary }} />}></Button>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const data = { ...values };
        if (record.id) {
          data.id = record.id;
        }
        setIsLoading(true);
        const result: any = await updateDoc(record.id, data);
        setIsLoading(false);
        if (result?.code !== 0) {
          message.error(result?.message);
          return false;
        }
        message.success(result?.message);
        refetch();
        form.resetFields();
        return true;
      }}
    >
      <ProFormText
        name="publish_version"
        label={t("form.publish_version.label")}
        placeholder={t("form.publish_version.placeholder")}
        rules={[
          {
            required: true,
            message: t("form.publish_version.message"),
          },
        ]}
      />
      <ProFormSelect
        name="type"
        label={t("form.type.label")}
        placeholder={t("form.type.placeholder")}
        rules={[
          {
            required: true,
            message: t("form.type.message"),
          },
        ]}
        options={[
          {
            label: "重大更新",
            value: 1,
          },
          {
            label: "功能更新",
            value: 2,
          },
          {
            label: "修复Bug",
            value: 3,
          },
        ]}
      />
      <ProFormText
        name="publish_name"
        label={t("form.publish_name.label")}
        placeholder={t("form.publish_name.placeholder")}
        rules={[
          {
            required: true,
            message: t("form.publish_name.message"),
          },
        ]}
      />
      <ProFormDateTimePicker
        name="publish_time"
        label={t("form.publish_time.label")}
        placeholder={t("form.publish_time.placeholder")}
        rules={[
          {
            required: true,
            message: t("form.publish_time.message"),
          },
        ]}
      />
      <ProFormText
        name="url"
        label={t("form.url.label")}
        placeholder={t("form.url.placeholder")}
        rules={[
          {
            required: false,
            message: t("form.url.message"),
          },
        ]}
      />
      <ProFormTextArea
        name="content"
        label={t("form.content.label")}
        placeholder={t("form.content.placeholder")}
        rules={[
          {
            required: true,
            message: t("form.content.message"),
          },
        ]}
      />
    </ModalForm>
  );
}
