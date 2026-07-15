import { Button, Divider, Flex, Form, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import { useUpdateProfileLink } from "~/api-client/queries/profile/profile-link";
import { m } from "~/paraglide/messages";

import { FormItems } from "./form-items";

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
        title={m.profile_link_update_link_title()}
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
            try {
              await update.mutateAsync({
                ...values,
                id: record.id,
                categoryId,
              });
              message.success(m.profile_link_toast_updated());
              refetch();
              handleClose();
              return true;
            } catch (e) {
              message.error(e instanceof Error ? e.message : m.profile_link_toast_update_failed());
              return false;
            }
          }}
        >
          <FormItems />
          <Divider style={{ margin: "24px 0 0" }} />
          <Form.Item style={{ marginBottom: 0 }}>
            <Flex gap="small" wrap="wrap">
              <Button type="primary" htmlType="submit" loading={update.isPending}>
                {m.profile_link_toast_updated()}
              </Button>
              <Button onClick={handleClose}>{m.blog_edit_cancel_button()}</Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
