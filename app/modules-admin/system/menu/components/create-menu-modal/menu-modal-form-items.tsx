import { ProFormDependency, ProFormRadio } from "@ant-design/pro-components";

import { TypeDir } from "./type-dir";
import { TypeMenu } from "./type-menu";
import { TypePermission } from "./type-permission";

export function MenuModalFormItems({ innerMenuNotPerm, record }: any) {
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
        disabled={record.id}
        initialValue={!record.id ? 1 : record.type}
        options={[
          {
            label: "目录",
            value: 1,
          },
          {
            label: "菜单",
            value: 2,
          },
          {
            label: "权限",
            value: 3,
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
            return <TypeDir menuNotPerm={innerMenuNotPerm}></TypeDir>;
          }
          if (type === 2) {
            return <TypeMenu menuNotPerm={innerMenuNotPerm}></TypeMenu>;
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
