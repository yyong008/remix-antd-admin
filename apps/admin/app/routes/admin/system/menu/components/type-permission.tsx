import {
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";

export function TypePermission({ menuNotPerm }: any) {
  return (
    <>
      <ProFormText
        name="name"
        label={m.system_menu_type_permission()}
        placeholder={m.tools_placeholder_select()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormTreeSelect
        name="parent_menu_id"
        label={m.system_menu_field_parent()}
        placeholder={m.system_menu_field_parent_placeholder()}
        request={() => menuNotPerm}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
        fieldProps={{ fieldNames: { label: "name", value: "id" } }}
      />
      <ProFormText
        name="permission"
        label={m.system_menu_field_permission()}
        placeholder={m.tools_placeholder_select()}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
      />
      <ProFormDigit
        name="orderNo"
        label={m.system_menu_field_order()}
        placeholder={m.system_menu_field_order()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormRadio.Group
        name="status"
        label={m.system_status()}
        tooltip={m.system_menu_field_status_tip()}
        options={[
          { label: m.system_enabled(), value: 1 },
          { label: m.system_disabled(), value: 0 },
        ]}
      />
    </>
  );
}
