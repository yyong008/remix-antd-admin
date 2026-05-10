import { Button, Divider, Flex, Form, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import { useUpdateProfileLink } from "~/api-client/queries/profile/profile-link";

import { FormItems } from "./FormItems";

export function UpdateLinkModal({
  record,
  refetch,
  categoryId,
  open,
  onClose,
}: {
  record: { id: string; name?: string; url?: string; description?: string | null };
  refetch: () => void;
  categoryId: string;
  open?: boolean;
  onClose?: () => void;
}) {
  const [internalOpen, setOpen] = useState(false);
  const [form] = Form.useForm();
  const update = useUpdateProfileLink();

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  useEffect(() => {
    if (isOpen && record?.id) {
      form.setFieldsValue({ ...record });
    }
  }, [isOpen, form, record]);

  const handleClose = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setOpen(false);
    }
    form.resetFields();
  };

  return (
    <>
      {!isControlled && (
        <Button type="link" size="small" icon={<EditOutlined />} onClick={() => setOpen(true)} />
      )}
      <Modal
        title="编辑链接"
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        destroyOnHidden
        width={520}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            const res = (await update.mutateAsync({
              ...values,
              id: record.id,
              categoryId,
            })) as { code?: number; message?: string };
            if (res.code !== 0) {
              message.error(res.message ?? "更新失败");
              return false;
            }
            message.success(res.message ?? "已更新");
            refetch();
            handleClose();
            return true;
          }}
        >
          <FormItems />
          <Divider style={{ margin: "24px 0 0" }} />
          <Form.Item style={{ marginBottom: 0 }}>
            <Flex gap="small" wrap="wrap">
              <Button type="primary" htmlType="submit" loading={update.isPending}>
                更新
              </Button>
              <Button onClick={handleClose}>取消</Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
