import { Button, Form, Modal, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { useUpdateBlogTag } from "~/api-client/queries/blog-tag";
import { ModalFormItems } from "./ModalFormItems";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export function UpdateBlogModal({ refetch, record, open, onClose }: any) {
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  const { mutateAsync: updateTag } = useUpdateBlogTag();

  const handleClose = () => {
    form.resetFields();
    onClose?.();
  };

  return (
    <Modal title="修改标签" open={open} onCancel={handleClose} footer={null} destroyOnHidden>
      <Form
        form={form}
        layout="vertical"
        initialValues={record}
        onFinish={async (values: any) => {
          try {
            const result = (await updateTag({ id: record.id, ...values })) as {
              code?: number;
              message?: string;
            };
            if (result.code !== 0) {
              message.error(result.message ?? "修改失败");
              return false;
            }
            message.success("修改成功");
            form.resetFields();
            refetch?.();
            handleClose();
            return true;
          } catch (e) {
            message.error(e instanceof Error ? e.message : "修改失败");
            return false;
          }
        }}
      >
        <ModalFormItems />
        <Form.Item style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
