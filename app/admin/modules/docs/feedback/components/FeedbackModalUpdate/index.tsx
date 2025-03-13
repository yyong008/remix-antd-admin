import { Button, Form, message } from "antd";
import {
  ModalForm,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";

import { EditOutlined } from "@ant-design/icons";
import { genFileListByName } from "~/utils/client/utils";
import { uploadConfig } from "~/config/uploadConfig";
import { useState } from "react";
import { updateFeedback } from "~/admin/apis/admin/docs";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export default function FeedbackModalUpdate({ record, refetch }: any) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const p = useColorPrimary()
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      loading={isLoading}
      title={"修改反馈"}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
          file: genFileListByName(record.url),
        });
      }}
      trigger={<Button type={"link"} icon={<EditOutlined style={{ color: p.colorPrimary }} />}></Button>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const data = { content: values.content, url: "" };
        if (values.file && values.file.length > 0) {
          const url: string = values.file[0].response.data.url;
          if (url.startsWith(uploadConfig.prefix)) {
            data.url = url;
          } else {
            data.url = `${uploadConfig.prefix}/${url}`;
          }
        }
        setIsLoading(true);
        const result: any = await updateFeedback(record.id, data);
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
        action="/api/v1/admin/upload/feedback"
        accept="image/*.png"
        fieldProps={{
          onChange(info) {
            if (info.file.status === "error") {
              message.error(info.file.response?.message);
            }
          },
          // customRequest: async (info: any) => {
          //   const fileData = new FormData();
          //   fileData.append("file", info.file);
          //   const result: any = await uploadFeedback(fileData);
          //   setIsLoading(false);
          //   debugger
          //   if (result?.code !== 0) {
          //     debugger
          //     message.error(result?.message);
          //     return false;
          //   }
          //   return result.data.url;
          // },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }}
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
