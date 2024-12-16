import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";
import { systemDictItem } from "@/apis-client/admin/system/dict-item";
import { useParams } from "@remix-run/react";

type CreateDictModalProps = {
  trigger?: any;
  refetch?: () => void;
};

export function CreateDictItemModal(props: CreateDictModalProps) {
  const { trigger, refetch } = props;
  const { id } = useParams();
  const [form] = Form.useForm();
  const [createDictItem] = systemDictItem.useCreateSystemDictItemMutation();

  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={"创建字典项"}
      onOpenChange={(c) => {
        if (!c) {
          return;
        }
        form.resetFields();
      }}
      trigger={
        trigger ?? (
          <Button type={"primary"} icon={<EditOutlined />}>
            {"新建"}
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const vals = { ...values, dictionary_id: Number(id) };
        await createDictItem({ dictionary_id: Number(id), data: vals });
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
