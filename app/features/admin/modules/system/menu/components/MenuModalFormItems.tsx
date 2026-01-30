import { ProFormDependency, ProFormRadio } from "@ant-design/pro-components";

import { TypeDir } from "./TypeDir";
import { TypeMenu } from "./TypeMenu";
import { TypePermission } from "./TypePermission";
import { useCallback } from "react";

export function MenuModalFormItems({ innerMenuNotPerm, record, form }: any) {
  const disabled = useCallback(
    (type: number) => {
      if (!record) {
        return {};
      }
      if (record && record.type) {
        return {
          disabled: record.type !== type,
        };
      }
    },
    [record],
  );
  return (
    <>
      <ProFormRadio.Group
        name="type"
        label="菜单类型"
        radioType="button"
        fieldProps={{
          buttonStyle: "solid",
        }}
        width={300}
        initialValue={!record?.id ? 1 : record.type}
        options={[
          {
            label: "目录",
            value: 1,
            ...disabled(1),
          },
          {
            label: "菜单",
            value: 2,
            ...disabled(2),
          },
          {
            label: "权限",
            value: 3,
            ...disabled(3),
          },
        ]}
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      />

      <ProFormDependency key="typeMode" name={["type"]} ignoreFormListField>
        {({ type }) => {
          if (type === 1) {
            return (
              <TypeDir
                menuNotPerm={innerMenuNotPerm}
                form={form}
                icon={record?.icon}
              ></TypeDir>
            );
          }
          if (type === 2) {
            return (
              <TypeMenu
                menuNotPerm={innerMenuNotPerm}
                form={form}
                icon={record?.icon}
              ></TypeMenu>
            );
          }
          if (type === 3) {
            return (
              <TypePermission menuNotPerm={innerMenuNotPerm}></TypePermission>
            );
          }
        }}
      </ProFormDependency>
    </>
  );
}
