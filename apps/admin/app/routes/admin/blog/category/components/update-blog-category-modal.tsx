import { Button, Form, Modal, message } from "antd";
import { useEffect } from "react";

import { useUpdateBlogCategory } from "~/api-client/queries/blog/blog-category";
import { m } from "~/paraglide/messages";

import { ModalFormItems } from "./modal-form-items";

export function UpdateBlogCategoryModal({
  record,
  refetch,
  open,
  onClose,
}: {
  record: { id: string; name?: string; description?: string | null; showOnClient?: boolean };
  refetch?: () => void;
  open?: boolean;
  onClose?: () => void;
}) {
  const [form] = Form.useForm();
  const { mutateAsync, isPending } = useUpdateBlogCategory();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...record,
        showOnClient: record.showOnClient !== false,
      });
    }
  }, [open, form, record]);

  const handleClose = () => {
    form.resetFields();
    onClose?.();
  };

  return (
    <Modal
      title={m.blog_category_update_title()}
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={async (values) => {
          try {
            await mutateAsync({ ...values, id: record.id });
            message.success(m.blog_category_toast_updated());
            refetch?.();
            form.resetFields();
            handleClose();
            return true;
          } catch (e) {
            message.error(e instanceof Error ? e.message : m.blog_category_toast_failed());
            return false;
          }
        }}
      >
        <ModalFormItems />
        <Form.Item style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit" loading={isPending}>
            {m.blog_category_submit_button()}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
