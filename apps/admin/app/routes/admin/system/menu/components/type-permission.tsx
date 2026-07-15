import {
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from "~/components/pro-form-kit";
import { useMemo } from "react";
import { m } from "~/paraglide/messages";
import { resolveMenuLabel } from "~/utils/client/menu-label";
import { PERMISSION_LABEL_VALUES } from "~/utils/client/menu-i18n-options";

function withResolvedTitles(items: any[]): any[] {
  return (items ?? []).map((it) => ({
    ...it,
    title: resolveMenuLabel(it.name),
    children: it.children?.length ? withResolvedTitles(it.children) : it.children,
  }));
}

export function TypePermission({ menuNotPerm }: any) {
  const treeData = useMemo(() => withResolvedTitles(menuNotPerm ?? []), [menuNotPerm]);
  const nameOptions = useMemo(
    () => PERMISSION_LABEL_VALUES.map((v) => ({ label: `${v} (${v})`, value: v })),
    [],
  );
  return (
    <>
      <ProFormSelect
        name="name"
        label={m.system_menu_type_permission()}
        placeholder={m.tools_placeholder_select()}
        options={nameOptions}
        fieldProps={{ showSearch: true, optionFilterProp: "label" }}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormTreeSelect
        name="parent_menu_id"
        label={m.system_menu_field_parent()}
        placeholder={m.system_menu_field_parent_placeholder()}
        request={async () => treeData}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
        fieldProps={{ fieldNames: { label: "title", value: "id" } }}
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
