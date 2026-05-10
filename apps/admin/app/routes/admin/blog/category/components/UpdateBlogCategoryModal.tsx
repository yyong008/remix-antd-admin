import { Button, Form, Input, Modal, Switch, message } from "antd";

import { useUpdateBlogCategory } from "~/api-client/queries/blog/blog-category";

export function UpdateBlogCategoryModal({
  title = "编辑分类",
  record,
  refetch,
  open,
  onClose,
}: {
  title?: string;
  record: any;
  refetch?: () => void;
  open?: boolean;
  onClose?: () => void;
}) {
  const [form] = Form.useForm();
  const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateBlogCategory();

  const handleClose = () => {
    form.resetFields();
    onClose?.();
  };

  return (
    <Modal title={title} open={open} onCancel={handleClose} footer={null} destroyOnHidden>
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
            handleClose();
            return true;
          } catch (e) {
            message.error(e instanceof Error ? e.message : "更新失败");
            return false;
          }
        }}
      >
        <Form.Item
          label="分类名称"
          name="name"
          rules={[{ required: true, message: "请输入分类名称" }]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
        <Form.Item label="分类描述" name="description">
          <Input.TextArea placeholder="请输入分类描述" rows={3} />
        </Form.Item>
        <Form.Item label="在客户端展示" name="showOnClient" valuePropName="checked">
          <Switch checkedChildren="展示" unCheckedChildren="隐藏" />
        </Form.Item>
        <Form.Item style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit" loading={isUpdating}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
