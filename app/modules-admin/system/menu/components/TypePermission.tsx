import {
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from "@ant-design/pro-components";

export function TypePermission({ menuNotPerm }: any) {
  return (
    <>
      <ProFormText
        name="name"
        label="权限名称"
        placeholder="选择权限"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormTreeSelect
        name="parentId"
        label="上级节点"
        placeholder="请选择上级节点"
        request={() => {
          return menuNotPerm;
        }}
        rules={[
          {
            required: true,
            message: "请选择",
          },
        ]}
        fieldProps={{
          fieldNames: { label: "name", value: "id" },
        }}
      />
      <ProFormText
        name="permission"
        label="权限"
        placeholder="选择权限"
        rules={[
          {
            required: true,
            message: "请选择",
          },
        ]}
      />
      <ProFormDigit
        name="orderNo"
        label="节点排序"
        placeholder="节点排序"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        tooltip="是否在启动菜单"
        options={[
          {
            label: "启用",
            value: 1,
          },
          {
            label: "禁用",
            value: 0,
          },
        ]}
      />
    </>
  );
}
