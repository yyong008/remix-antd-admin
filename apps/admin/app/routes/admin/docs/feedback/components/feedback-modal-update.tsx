import { Button, Form, message } from "antd";
import { ModalForm, ProFormTextArea, ProFormUploadButton } from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateFeedback } from "~/api-client/queries/docs-feedback";

export default function FeedbackModal({ record, refetch }: any) {
  const [form] = Form.useForm();
  const updateFeedback = useUpdateFeedback();
  const title = record?.id ? m.docs_feedback_update_title() : m.docs_feedback_create_title();
  return (
    <ModalForm
      preserve={false}
      loading={updateFeedback.isPending}
      title={title}
      onOpenChange={(c) => {
        if (!c || !record.id) return;
        form.setFieldsValue({ ...record });
      }}
      trigger={<Button type="link" icon={<EditOutlined />} />}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const data = { ...values };
        if (values.file && values.file.length > 0) {
          const url: string = values.file[0].response.data.name;
          const prefix = "/uploads/";
          data.url = url.startsWith(prefix) ? url : `${prefix}${url}`;
        }
        if (record.id) data.id = record.id;
        delete data.file;
        const result = await updateFeedback.mutateAsync(data);
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
      <ProFormTextArea
        name="content"
        label={m.docs_feedback_field_content()}
        placeholder={m.docs_feedback_field_content_placeholder()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormUploadButton
        label={m.docs_feedback_field_image()}
        name="file"
        placeholder={m.tools_placeholder_enter()}
        listType="picture-card"
        action="/api/upload"
        max={1}
      />
    </ModalForm>
  );
}
