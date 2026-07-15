import { Button, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from "~/components/pro-form-kit";
import { useCreateDictItem } from "~/api-client/queries/system/system-dict-item";
import { useParams } from "react-router";
import { m } from "~/paraglide/messages";

type CreateDictItemModalProps = {
  trigger?: any;
  refetch?: () => void;
};

export function CreateDictItemModal(props: CreateDictItemModalProps) {
  const { trigger, refetch } = props;
  const { id } = useParams();
  const dictionaryId = id!;
  const [form] = Form.useForm();
  const createDictItem = useCreateDictItem();

  return (
    <ModalForm
      preserve={false}
      title={m.system_dict_item_modal_create()}
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
        if (!dictionaryId) return false;
        const vals = { ...values, dictionary_id: dictionaryId };
        await createDictItem.mutateAsync({ dictionaryId, data: vals });
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      <ProFormText
        name="key"
        label={m.system_dict_item_field_key()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormText
        name="value"
        label={m.system_dict_item_field_value()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormTextArea
        name="remark"
        label={m.system_dict_item_field_remark()}
        placeholder={m.tools_placeholder_enter()}
      />
      <ProFormRadio.Group
        name="status"
        label={m.system_dict_item_field_status()}
        initialValue={1}
        options={[
          { label: m.system_enabled(), value: 1 },
          { label: m.system_disabled(), value: 0 },
        ]}
      />
    </ModalForm>
  );
}
