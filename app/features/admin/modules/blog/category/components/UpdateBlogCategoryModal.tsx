import { Button, Form, Modal, message } from "antd";
import { useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { ModalFormItems } from "./ModalFormItems";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useUpdateBlogCategory } from "~/api-client/queries/blog-category";

export function UpdateBlogCategoryModal({
  trigger,
  title = "编辑分类",
  record,
  refetch,
  open: externalOpen,
  onClose,
}: {
  trigger?: React.ReactNode;
  title?: string;
  record: any;
  refetch?: () => void;
  open?: boolean;
  onClose?: () => void;
}) {
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = onClose
    ? (o: boolean) => {
        if (!o) onClose();
        else setInternalOpen(o);
      }
    : (o: boolean) => setInternalOpen(o);
  const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateBlogCategory();

  return (
    <>
      {trigger ?? (
        <Button
          type={"link"}
          icon={<EditOutlined style={{ color: colorPrimary }} />}
          onClick={() => setOpen(true)}
        ></Button>
      )}
      <Modal
        title={title}
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={record}
          onFinish={async (values) => {
            try {
              await updateCategory({ ...values, id: record.id });
              message.success("更新成功");
              refetch?.();
              form.resetFields();
              setOpen(false);
              return true;
            } catch (e) {
              message.error(e instanceof Error ? e.message : "更新失败");
              return false;
            }
          }}
        >
          <ModalFormItems />
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
