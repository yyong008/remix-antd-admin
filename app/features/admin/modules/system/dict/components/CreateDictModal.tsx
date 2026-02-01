import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";
import { useCreateDict } from "~/api-client/queries/system-dict";

type CreateDictModalProps = {
  trigger?: any;
  refetch?: () => void;
};

export function CreateDictModal(props: CreateDictModalProps) {
  const { trigger, refetch } = props;
  const [form] = Form.useForm();
  const createDict = useCreateDict();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={"创建字典"}
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
        const vals = { ...values };
        await createDict.mutateAsync(vals);
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
