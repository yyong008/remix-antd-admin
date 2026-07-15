import {
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from "~/components/pro-form-kit";
import { AntdIcon } from "~/components/common/antd-icon";
import { AntdIconSelect } from "~/components/common/antd-icon-select";
import { useState } from "react";
import { m } from "~/paraglide/messages";

export function TypeMenu({ menuNotPerm, form }: any) {
  const [selectIconStr, setSelectIconStr] = useState(form?.getFieldValue("icon") ?? "");
  return (
    <>
      <ProFormText
        name="name"
        label={m.system_menu_field_name()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormTreeSelect
        name="parent_menu_id"
        label={m.system_menu_field_parent()}
        placeholder={m.system_menu_field_parent_placeholder()}
        request={async () => menuNotPerm}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
        fieldProps={{ fieldNames: { label: "name", value: "id" } }}
      />
      <ProFormText
        name="path"
        label={m.system_menu_field_path()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormText
        name="permission"
        label={m.system_menu_field_permission()}
        placeholder={m.tools_placeholder_select()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormText
        name="path_file"
        label={m.system_menu_field_path_file()}
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
        name="cache"
        label={m.system_menu_field_cache()}
        tooltip={m.system_menu_field_cache_tip()}
        options={[
          { label: m.system_yes(), value: 1 },
          { label: m.system_no(), value: 0 },
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
