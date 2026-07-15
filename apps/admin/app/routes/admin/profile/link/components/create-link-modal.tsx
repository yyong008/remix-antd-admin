import { nanoid } from "nanoid";
import { useState } from "react";
import { m } from "~/paraglide/messages";
import { FormItems } from "./form-items";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Modal, message } from "antd";
import { useCreateProfileLink } from "~/api-client/queries/profile/profile-link";

export function CreateLinkModal({
  refetch,
  categoryId,
}: {
  refetch: () => void;
  categoryId: string;
}) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const create = useCreateProfileLink();

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
        {m.profile_link_create_link()}
      </Button>
      <Modal
        title={m.profile_link_create_link_title()}
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnHidden
        width={520}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            const id = nanoid();
            try {
              await create.mutateAsync({
                ...values,
                id,
                categoryId,
              });
              message.success(m.profile_link_toast_created());
              refetch();
              form.resetFields();
              setOpen(false);
              return true;
            } catch (e) {
              message.error(e instanceof Error ? e.message : m.profile_link_toast_create_failed());
              return false;
            }
          }}
        >
          <FormItems />
          <Divider style={{ margin: "24px 0 0" }} />
          <Form.Item style={{ marginBottom: 0 }}>
            <Flex gap="small" wrap="wrap">
              <Button type="primary" htmlType="submit" loading={create.isPending}>
                {m.profile_link_toast_created()}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  form.resetFields();
                }}
              >
                {m.blog_edit_cancel_button()}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
