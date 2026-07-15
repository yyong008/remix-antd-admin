import { Button, Divider, Flex, Form, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";
import { useUpdateNewsCategory } from "~/api-client/queries/news/news-category";
import { m } from "~/paraglide/messages";

import { ModalFormItems, normalizeNewsCategoryValues } from "./modal-form-item";

export function UpdateNewsCategoryModal({
  record,
  refetch,
  open,
  onClose,
}: {
  record: { id: string; name?: string; description?: string | null; visible?: unknown };
  refetch: () => void;
  open?: boolean;
  onClose?: () => void;
}) {
  const [internalOpen, setOpen] = useState(false);
  const [form] = Form.useForm();
  const token = useAntdThemeToken();
  const iconStyles = { style: { color: token.colorPrimary } };
  const { mutateAsync, isPending } = useUpdateNewsCategory();

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        ...record,
        visible: record.visible !== false && record.visible !== 0 && record.visible !== "0",
      });
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

  const handleFinish = async (values: Record<string, unknown>) => {
    const normalized = normalizeNewsCategoryValues(values);
    if (!normalized.name) {
      message.error(m.news_category_name_required());
      return false;
    }
    try {
      await mutateAsync({
        id: record.id,
        name: normalized.name,
        description: normalized.description || undefined,
        visible: normalized.visible,
      });
      message.success(m.news_category_toast_updated());
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
      {!isControlled && (
        <Button
          type="link"
          size="small"
          icon={<EditOutlined {...iconStyles} />}
          onClick={() => setOpen(true)}
          aria-label={m.news_action_edit()}
        />
      )}
      <Modal
        title={m.news_category_update_title()}
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        destroyOnHidden
        width={520}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <ModalFormItems />
          <Divider style={{ margin: "24px 0 0" }} />
          <Form.Item style={{ marginBottom: 0 }}>
            <Flex gap="small" wrap="wrap">
              <Button type="primary" htmlType="submit" loading={isPending}>
                {m.news_category_update_button()}
              </Button>
              <Button onClick={handleClose}>{m.news_category_cancel_button()}</Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
