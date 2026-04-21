import { Button, Divider, Flex, Form, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { nanoid } from "nanoid";

import { useCreateProfileLink } from "~/api-client/queries/profile-link";

import { FormItems } from "./FormItems";

export function LinkModalCreate({
  refetch,
  categoryId,
}: {
  refetch: () => void;
  categoryId: string;
}) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const create = useCreateProfileLink();

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
        新建链接
      </Button>
      <Modal
        title="创建链接"
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnHidden
        width={520}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            const id = nanoid();
            const res = (await create.mutateAsync({
              ...values,
              id,
              categoryId,
            })) as { code?: number; message?: string };
            if (res.code !== 0) {
              message.error(res.message ?? "创建失败");
              return false;
            }
            message.success(res.message ?? "创建成功");
            refetch();
            form.resetFields();
            setOpen(false);
            return true;
          }}
        >
          <FormItems />
          <Divider style={{ margin: "24px 0 0" }} />
          <Form.Item style={{ marginBottom: 0 }}>
            <Flex gap="small" wrap="wrap">
              <Button type="primary" htmlType="submit" loading={create.isPending}>
                创建
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  form.resetFields();
                }}
              >
                取消
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
