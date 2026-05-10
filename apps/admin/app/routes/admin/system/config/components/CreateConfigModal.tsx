import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "~/components/pro-form-kit";
import { ModalFormItems } from "./ModalFormItems";
import { useCreateConfig } from "~/api-client/queries/system/system-config";

type CreateConfigModalProps = {
  trigger?: any;
  refetch?: () => void;
};

export function CreateConfigModal(props: CreateConfigModalProps) {
  const { trigger, refetch } = props;
  const [form] = Form.useForm();
  const createConfig = useCreateConfig();

  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={"创建配置"}
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
        destroyOnHidden: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const vals = { ...values };
        await createConfig.mutateAsync(vals);
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
