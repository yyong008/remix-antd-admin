import { ProFormDependency, ProFormRadio } from "~/components/pro-form-kit";
import { TypeDir } from "./type-dir";
import { TypeMenu } from "./type-menu";
import { TypePermission } from "./type-permission";
import { useCallback } from "react";
import { m } from "~/paraglide/messages";

export function MenuModalFormItems({ innerMenuNotPerm, record, form }: any) {
  const disabled = useCallback(
    (type: number) => {
      if (!record) return {};
      if (record && record.type) {
        return { disabled: record.type !== type };
      }
    },
    [record],
  );
  return (
    <>
      <ProFormRadio.Group
        name="type"
        label={m.system_menu_field_type()}
        radioType="button"
        fieldProps={{ buttonStyle: "solid", className: "flex flex-wrap gap-1" }}
        initialValue={!record?.id ? 1 : record.type}
        options={[
          { label: m.system_menu_type_dir(), value: 1, ...disabled(1) },
          { label: m.system_menu_type_menu(), value: 2, ...disabled(2) },
          { label: m.system_menu_type_permission(), value: 3, ...disabled(3) },
        ]}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
      />

      <ProFormDependency key="typeMode" name={["type"]} ignoreFormListField>
        {({ type }) => {
          if (type === 1)
            return <TypeDir menuNotPerm={innerMenuNotPerm} form={form} icon={record?.icon} />;
          if (type === 2)
            return <TypeMenu menuNotPerm={innerMenuNotPerm} form={form} icon={record?.icon} />;
          if (type === 3) return <TypePermission menuNotPerm={innerMenuNotPerm} />;
        }}
      </ProFormDependency>
    </>
  );
}
