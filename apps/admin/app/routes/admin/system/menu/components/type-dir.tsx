import {
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from "~/components/pro-form-kit";
import { AntdIcon } from "~/components/common/antd-icon";
import { AntdIconSelect } from "~/components/common/antd-icon-select";
import { useMemo, useState } from "react";
import { m } from "~/paraglide/messages";
import { buildMenuI18nOptions } from "~/utils/client/menu-i18n-options";
import { resolveMenuLabel } from "~/utils/client/menu-label";

function withResolvedTitles(items: any[]): any[] {
  return (items ?? []).map((it) => ({
    ...it,
    title: resolveMenuLabel(it.name),
    children: it.children?.length ? withResolvedTitles(it.children) : it.children,
  }));
}

export function TypeDir({ menuNotPerm, form }: any) {
  const [selectIconStr, setSelectIconStr] = useState(form?.getFieldValue("icon") ?? "");
  const treeData = useMemo(() => withResolvedTitles(menuNotPerm ?? []), [menuNotPerm]);
  const nameOptions = useMemo(() => buildMenuI18nOptions(), []);
  return (
    <>
      <ProFormSelect
        name="name"
        label={m.system_menu_field_name()}
        placeholder={m.tools_placeholder_select()}
        options={nameOptions}
        fieldProps={{ showSearch: true, optionFilterProp: "label" }}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
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
        name="path"
        label={m.system_menu_field_path()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormText
        name="icon"
        label={m.system_menu_field_icon()}
        placeholder={m.tools_placeholder_enter()}
        fieldProps={{
          readOnly: true,
          addonBefore: (
            <AntdIconSelect
              selectIconStr={selectIconStr}
              trigger={<AntdIcon name={form?.getFieldValue("icon")} />}
              onChange={(icon) => {
                form.setFieldValue("icon", icon);
                setSelectIconStr(icon);
              }}
            />
          ),
        }}
      />
      <ProFormDigit
        name="orderNo"
        label={m.system_menu_field_order()}
        placeholder={m.system_menu_field_order()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormTextArea
        name="description"
        label={m.system_menu_field_description()}
        placeholder={m.system_dept_field_description_placeholder()}
      />
      <ProFormTextArea name="remark" label={m.system_menu_field_remark()} />
      <ProFormRadio.Group
        name="isLink"
        label={m.system_menu_field_is_link()}
        tooltip={m.system_menu_field_is_link_tip()}
        options={[
          { label: m.system_yes(), value: 1 },
          { label: m.system_no(), value: 0 },
        ]}
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
      <ProFormRadio.Group
        name="isShow"
        label={m.system_menu_field_is_show()}
        tooltip={m.system_menu_field_is_show_tip()}
        options={[
          { label: m.system_yes(), value: 1 },
          { label: m.system_no(), value: 0 },
        ]}
      />
    </>
  );
}
