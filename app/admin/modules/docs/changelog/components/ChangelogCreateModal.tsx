import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { EditOutlined } from "@ant-design/icons";
import { createDoc } from "@/admin/apis/admin/docs";
import { useTranslation } from "react-i18next";

export function ChangelogCreateModal({ refetch }: any) {
  const [form] = Form.useForm();
  const { t } = useTranslation("docs");
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={t("modal.create.title")}
      onOpenChange={() => {}}
      trigger={
        <Button type="primary" icon={<EditOutlined />}>
          {t("list.action.create")}
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitter={{
        render: (props) => {
          return <Button type="primary" onClick={props.submit}>
            {t("modal.create.submit")}
          </Button>
        },
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const result: any = await createDoc(values);
        if (result && result?.code !== 0) {
          message.error(result?.message);
          return true;
        }
        message.success(result?.message);
        refetch();
        form.resetFields();
        return false;
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
