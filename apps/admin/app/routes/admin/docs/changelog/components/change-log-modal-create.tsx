import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";
import { EditOutlined } from "@ant-design/icons";

export function ChangeLogCreateModal({ refetch }: any) {
  const [form] = Form.useForm();
  const [createChangelog, other] = [(..._args: any): any => {}, { isLoading: false }];

  return (
    <ModalForm
      preserve={false}
      loading={other.isLoading}
      title={m.docs_changelog_create_title()}
      trigger={
        <Button type="primary" icon={<EditOutlined />}>
          {m.system_create()}
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const result = await createChangelog(values);
        if (result.data?.code !== 0) {
          message.error(result.data?.message);
          return false;
        }
        message.success(result.data?.message);
        refetch();
        form.resetFields();
        return true;
      }}
    >
      <ProFormText
        name="publish_version"
        label={m.docs_changelog_field_version()}
        placeholder={m.docs_changelog_field_version_placeholder()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormSelect
        name="type"
        label={m.docs_changelog_field_type()}
        placeholder={m.docs_changelog_field_type()}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
        options={[
          { label: m.docs_changelog_type_major(), value: 1 },
          { label: m.docs_changelog_type_feature(), value: 2 },
          { label: m.docs_changelog_type_fix(), value: 3 },
        ]}
      />
      <ProFormText
        name="publish_name"
        label={m.docs_changelog_field_publisher()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormDateTimePicker
        name="publish_time"
        label={m.docs_changelog_field_publish_time()}
        placeholder={m.docs_changelog_field_publish_time()}
        rules={[{ required: true, message: m.docs_changelog_field_publish_time() }]}
      />
      <ProFormText
        name="url"
        label={m.docs_changelog_field_url()}
        placeholder={m.docs_changelog_field_url()}
      />
      <ProFormTextArea
        name="content"
        label={m.docs_changelog_field_content()}
        placeholder={m.docs_changelog_field_content_placeholder()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
    </ModalForm>
  );
}
