import * as ic from "@ant-design/icons";

import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";

import { useUpdateFeedbackByIdMutation } from "~/apis-client/admin/docs/feedback";

const { EditOutlined } = ic;

export default function FeedbackModal({ record, refetch }: any) {
  const [form] = Form.useForm();
  const [updateFeedback, other] = useUpdateFeedbackByIdMutation();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      loading={other.isLoading}
      title={record?.id ? "修改反馈" : "创建反馈"}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={<Button type={"link"} icon={<EditOutlined />}></Button>}
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
        if (record.id) {
          data.id = record.id;
        }
        delete data.file;
        const result = await updateFeedback(data);
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
