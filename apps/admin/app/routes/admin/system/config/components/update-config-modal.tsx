import { Button, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from "~/components/pro-form-kit";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useUpdateConfig } from "~/api-client/queries/system/system-config";
import { m } from "~/paraglide/messages";

function FormItems() {
  return (
    <>
      <ProFormText
        name="name"
        label={m.system_config_field_name()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormText
        name="key"
        label={m.system_config_field_key()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormText
        name="value"
        label={m.system_config_field_value()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormText
        name="type"
        label={m.system_config_field_type()}
        placeholder={m.tools_placeholder_enter()}
      />
      <ProFormTextArea
        name="description"
        label={m.system_config_field_description()}
        placeholder={m.tools_placeholder_enter()}
      />
      <ProFormTextArea
        name="remark"
        label={m.system_config_field_remark()}
        placeholder={m.tools_placeholder_enter()}
      />
      <ProFormRadio.Group
        name="status"
        label={m.system_config_field_status()}
        initialValue={1}
        options={[
          { label: m.system_enabled(), value: 1 },
          { label: m.system_disabled(), value: 0 },
        ]}
      />
    </>
  );
}

export function UpdateConfigModal({ trigger, record, refetch }: any) {
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  const update = useUpdateConfig();

  return (
    <ModalForm
      preserve={false}
      title={m.system_config_modal_update()}
      onOpenChange={(c) => {
        if (c && record.id) {
          form.setFieldsValue({ ...record });
        }
      }}
      trigger={
        trigger ?? <Button type="link" icon={<EditOutlined style={{ color: colorPrimary }} />} />
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
      <FormItems />
    </ModalForm>
  );
}
