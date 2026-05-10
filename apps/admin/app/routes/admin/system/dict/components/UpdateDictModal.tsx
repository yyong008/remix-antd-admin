import { Button, Form } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "~/components/pro-form-kit";
import { ModalFormItems } from "./ModalFormItems";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useUpdateDict } from "~/api-client/queries/system/system-dict";

export function UpdateDictModal({ trigger, record, refetch }: any) {
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  const update = useUpdateDict();
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={"修改字典"}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={
        trigger ?? (
          <Button type={"link"} icon={<EditOutlined style={{ color: colorPrimary }} />}></Button>
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
        if (record.id) {
          vals.id = record.id;
        }
        await update.mutateAsync(vals);
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
