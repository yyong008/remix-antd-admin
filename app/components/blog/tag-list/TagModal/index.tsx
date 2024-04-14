// component
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import * as _icons from "@ant-design/icons";
import { Button, Form } from "antd";

// remix
import { useParams } from "@remix-run/react";

const { EditOutlined } = _icons;

export default function TagModal({ trigger, record, fetcher }: any) {
  const [form] = Form.useForm();
  const { id } = useParams();

  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={record?.id ? "修改标签" : "创建标签"}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={
        trigger ?? (
          <Button
            type={!record.id ? "primary" : "link"}
            icon={<EditOutlined />}
          >
            {!record.id ? "新建" : ""}
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const vals = {
          ...values,
        };

        if (id) vals.categoryId = Number(id);
        if (record.id) vals.id = record.id;
        fetcher.submit(vals, {
          method: record.id ? "PUT" : "POST", // 修改或新建
          encType: "application/json",
        });
        form.resetFields();
        return true;
      }}
    >
      <ProFormText
        name="name"
        label="标签名"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        label="标签描述"
        placeholder="请输入"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      />
    </ModalForm>
  );
}
