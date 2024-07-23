import { Button, Form } from "antd";

import { DrawerForm } from "@ant-design/pro-components";

export function PDrawerForm({
  data,
  content,
  refetch,
  children,
  loading,
  submitter,
  onFinish,
}: any) {
  const [form] = Form.useForm();
  return (
    <DrawerForm
      loading={loading}
      form={form}
      initialValues={{ ...data }}
      submitter={submitter}
      onFinish={async (v) => {
        onFinish(v);
      }}
      trigger={<Button type="primary">发布邮件</Button>}
    >
      {children}
    </DrawerForm>
  );
}
