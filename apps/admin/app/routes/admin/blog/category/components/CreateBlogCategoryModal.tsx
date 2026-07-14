import { Button, Form, Modal, message } from "antd";
import { useState } from "react";

import { useCreateBlogCategory } from "~/api-client/queries/blog/blog-category";
import { ModalFormItems } from "./ModalFormItems";

export function CreateBlogCategoryModal({
  loading: _loading,
  trigger,
  title = "创建分类",
  onOpenChange,
  refetch,
  open: externalOpen,
  setOpen: externalSetOpen,
}: {
  loading?: boolean;
  trigger?: React.ReactNode;
  title?: string;
  onOpenChange?: (open: boolean) => void;
  refetch?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen =
    externalSetOpen ??
    ((o) => {
      setInternalOpen(o);
      onOpenChange?.(o);
    });
  const { mutateAsync: createCategory, isPending: isCreating } = useCreateBlogCategory();
  return (
    <>
      {trigger ? (
        <span onClick={() => setOpen(true)}>{trigger}</span>
      ) : (
        <Button type="primary" onClick={() => setOpen(true)}>
          新建
        </Button>
      )}
      <Modal
        title={title}
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            try {
              await createCategory(values);
              refetch?.();
              form.resetFields();
              setOpen(false);
              return true;
            } catch (e) {
              message.error(e instanceof Error ? e.message : "创建失败");
              return false;
            }
          }}
        >
          <ModalFormItems />
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" loading={isCreating}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
