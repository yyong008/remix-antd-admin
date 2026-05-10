import { Divider, Form, Typography } from "antd";

import { ProFormRadio, ProFormText } from "~/components/pro-form-kit";

import { CustomTree } from "./CustomTree";

export function FormItems(props: any) {
  const { menu, checkedKeys, onCheck } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography.Title
        level={5}
        style={{ marginBottom: 12, marginTop: 0, color: "var(--ant-color-text-heading)" }}
      >
        基本信息
      </Typography.Title>
      <ProFormText
        name="name"
        label="角色名称"
        placeholder="如：运营、只读审计"
        rules={[{ required: true, message: "请输入角色名称" }]}
        fieldProps={{ allowClear: true, maxLength: 64 }}
      />
      <ProFormText
        name="value"
        label="角色标识"
        placeholder="英文标识，如 operator"
        rules={[{ required: true, message: "请输入角色标识" }]}
        fieldProps={{ allowClear: true }}
      />
      <ProFormText
        name="description"
        label="描述"
        placeholder="选填，说明该角色用途"
        fieldProps={{ allowClear: true }}
      />
      <ProFormText
        name="remark"
        label="备注"
        placeholder="选填"
        fieldProps={{ allowClear: true }}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        options={[
          { label: "启用", value: 1 },
          { label: "禁用", value: 0 },
        ]}
        rules={[{ required: true, message: "请选择状态" }]}
      />

      <Divider style={{ marginTop: 16, marginBottom: 16 }} />
      <Typography.Title
        level={5}
        style={{ marginBottom: 8, marginTop: 0, color: "var(--ant-color-text-heading)" }}
      >
        菜单权限
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12, fontSize: 14 }}>
        勾选该角色可访问的后台菜单；目录与子菜单联动以树形展示。
      </Typography.Paragraph>
      <Form.Item name="menus" style={{ marginBottom: 0 }}>
        <CustomTree menu={menu} checkedKeys={checkedKeys} onCheck={onCheck} />
      </Form.Item>
    </div>
  );
}
