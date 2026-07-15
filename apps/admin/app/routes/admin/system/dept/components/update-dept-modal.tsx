import { Button, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "~/components/pro-form-kit";
import { ModalFormItems } from "./modal-form-item";
import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";
import { useUpdateDept } from "~/api-client/queries/system/system-dept";
import { m } from "~/paraglide/messages";

type UpdateDeptModalProps = {
  trigger?: any;
  record?: any;
  treeOptions?: any;
  refetch?: () => void;
};

export function UpdateDeptModal(props: UpdateDeptModalProps) {
  const { trigger, record, treeOptions, refetch } = props;
  const [form] = Form.useForm();
  const updateDept = useUpdateDept();
  const token = useAntdThemeToken();

  return (
    <ModalForm
      preserve={false}
      title={m.system_dept_modal_update()}
      onOpenChange={(c) => {
        if (c && record.id) {
          form.setFieldsValue({ ...record });
        }
      }}
      trigger={
        trigger ?? (
          <Button
            type="link"
            icon={
              <EditOutlined
                style={{ color: token.colorPrimary }}
                twoToneColor={token.colorPrimary}
              />
            }
          />
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
        await updateDept.mutateAsync(vals);
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      <ModalFormItems treeOptions={treeOptions} />
    </ModalForm>
  );
}
