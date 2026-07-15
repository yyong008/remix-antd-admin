import { Button, Divider, Flex, Form, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useCreateNewsCategory } from "~/api-client/queries/news/news-category";
import { m } from "~/paraglide/messages";

import { ModalFormItems, normalizeNewsCategoryValues } from "./modal-form-item";

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
      message.error(m.news_category_name_required());
      return false;
    }
    try {
      await mutateAsync({
        name: normalized.name,
        description: normalized.description || undefined,
        visible: normalized.visible,
      });
      message.success(m.news_category_toast_created());
      refetch();
      handleClose();
      return true;
    } catch (e) {
      message.error(e instanceof Error ? e.message : m.news_category_toast_failed());
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
        {m.news_category_new_button()}
      </Button>
      <Modal
        title={m.news_category_create_title()}
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
                {m.news_category_create_button()}
              </Button>
              <Button onClick={handleClose}>{m.news_category_cancel_button()}</Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
