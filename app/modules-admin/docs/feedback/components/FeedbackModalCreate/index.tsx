import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";

import { EditOutlined } from "@ant-design/icons";
import { useCreateFeedbackMutation } from "@/apis-client/admin/docs/feedback";

export function FeedbackModalCreate({ refetch }: any) {
  const [form] = Form.useForm();
  const [createFeedback, other] = useCreateFeedbackMutation();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title="创建反馈"
      loading={other.isLoading}
      onOpenChange={(c) => {}}
      trigger={
        <Button type="primary" icon={<EditOutlined />}>
          新建
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
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
        const result = await createFeedback(data);
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
        label="反馈内容"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormUploadButton
        label="反馈图片"
        name="file"
        placeholder="请输入名称"
        listType="picture-card"
        action="/api/upload"
        max={1}
        rules={[
          {
            required: false,
            message: "请上传",
          },
        ]}
      />
    </ModalForm>
  );
}
