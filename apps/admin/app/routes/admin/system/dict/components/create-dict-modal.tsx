import { Button, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from "~/components/pro-form-kit";
import { useCreateDict } from "~/api-client/queries/system/system-dict";
import { m } from "~/paraglide/messages";

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
      preserve={false}
      title={m.system_dict_modal_create()}
      onOpenChange={(c) => {
        if (c) form.resetFields();
      }}
      trigger={
        trigger ?? (
          <Button type="primary" icon={<EditOutlined />}>
            {m.system_create()}
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
        await createDict.mutateAsync(values);
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      <ProFormText
        name="name"
        label={m.system_dict_field_name()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormText
        name="code"
        label={m.system_dict_field_code()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormTextArea
        name="remark"
        label={m.system_dict_field_remark()}
        placeholder={m.tools_placeholder_enter()}
      />
      <ProFormRadio.Group
        name="status"
        label={m.system_dict_field_status()}
        initialValue={1}
        options={[
          { label: m.system_enabled(), value: 1 },
          { label: m.system_disabled(), value: 0 },
        ]}
      />
    </ModalForm>
  );
}
