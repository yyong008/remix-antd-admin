import { Button, Form, message } from "antd";
import { ModalForm, ProFormTextArea, ProFormUploadButton } from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";
import { EditOutlined } from "@ant-design/icons";
import { useCreateFeedback } from "~/api-client/queries/docs-feedback";

export function FeedbackModalCreate({ refetch }: any) {
  const [form] = Form.useForm();
  const createFeedback = useCreateFeedback();
  return (
    <ModalForm
      preserve={false}
      title={m.docs_feedback_create_title()}
      loading={createFeedback.isPending}
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
        const data = { ...values };
        if (values.file && values.file.length > 0) {
          const url: string = values.file[0].response.data.name;
          const prefix = "/uploads/";
          data.url = url.startsWith(prefix) ? url : `${prefix}${url}`;
        }
        delete data.file;
        const result: any = await createFeedback.mutateAsync(data);
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
