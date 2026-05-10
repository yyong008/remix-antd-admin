import { Button, Divider, Flex, Form, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useCreateNewsCategory } from "~/api-client/queries/news/news-category";
import { ModalFormItems, normalizeNewsCategoryValues } from "./ModalFormItem";

export function CreateNewsCategoryModal({
  refetch,
  block = true,
}: {
  refetch: () => void;
  block?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { mutateAsync, isPending } = useCreateNewsCategory();

  const handleOpen = () => {
    form.setFieldsValue({ visible: true });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleFinish = async (values: Record<string, unknown>) => {
    const normalized = normalizeNewsCategoryValues(values);
    if (!normalized.name) {
      message.error("请输入分类名称");
      return false;
    }
    try {
      await mutateAsync({
        name: normalized.name,
        description: normalized.description || undefined,
        visible: normalized.visible,
      });
      message.success("创建成功");
      refetch();
      handleClose();
      return true;
    } catch (e) {
      message.error(e instanceof Error ? e.message : "创建失败");
      return false;
    }
  };

  return (
    <>
      <Button
        type="primary"
        size="small"
        block={block}
        icon={<PlusOutlined />}
        onClick={handleOpen}
      >
        新建分类
      </Button>
      <Modal
        title="新建新闻分类"
        open={open}
        onCancel={handleClose}
        footer={null}
        destroyOnHidden
        width={520}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ visible: true }}
        >
          <ModalFormItems />
          <Divider style={{ margin: "24px 0 0" }} />
          <Form.Item style={{ marginBottom: 0 }}>
            <Flex gap="small" wrap="wrap">
              <Button type="primary" htmlType="submit" loading={isPending}>
                创建
              </Button>
              <Button onClick={handleClose}>取消</Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
