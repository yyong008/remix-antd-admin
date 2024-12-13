import * as ic from "@ant-design/icons";

import { Button, Form } from "antd";

import { PCreateModal } from "@/components/pro-modal/modal";

const { EditOutlined } = ic;

type CreateUserModalProps = {
  children: any;
  loading: boolean;
  handleCreate: any;
  modalProps: any;
};

export function CreateUserModalUI(props: CreateUserModalProps) {
  const { children, loading, handleCreate, ...restProps } = props;
  const [form] = Form.useForm();
  return (
    <PCreateModal
      loading={loading}
      title="创建用户"
      trigger={
        <Button type="primary" icon={<EditOutlined />}>
          创建用户
        </Button>
      }
      onFinish={async (values: any) => {
        return handleCreate(values, form);
      }}
      {...restProps}
    >
      {children}
    </PCreateModal>
  );
}
