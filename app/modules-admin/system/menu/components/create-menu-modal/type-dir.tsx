import {
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from "@ant-design/pro-components";

export function TypeDir({ menuNotPerm }: any) {
  return (
    <>
      <ProFormText
        name="name"
        label="菜单名称"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      />
      <ProFormTreeSelect
        name="parentId"
        label="上级节点"
        placeholder="请选择上级节点"
        request={async () => {
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
        name="path"
        label="路由地址"
        placeholder="输入路由地址"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        name="icon"
        label="节点图标"
        placeholder="选择一个节点图标"
        rules={[
          {
            required: false,
            message: "请输入",
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
      <ProFormTextArea
        name="description"
        label="菜单描述"
        placeholder="不修改无需填写"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      />
      <ProFormTextArea name="remark" label="备注" />
      <ProFormRadio.Group
        name="isLink"
        label="外链"
        tooltip="是否是外部链接"
        options={[
          {
            label: "是",
            value: 1,
          },
          {
            label: "否",
            value: 0,
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
      <ProFormRadio.Group
        name="isShow"
        label="显示"
        tooltip="是否在菜单栏显示"
        options={[
          {
            label: "是",
            value: 1,
          },
          {
            label: "否",
            value: 0,
          },
        ]}
      />
    </>
  );
}
