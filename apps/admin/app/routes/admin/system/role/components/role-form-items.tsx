import { Divider, Form, Typography } from "antd";
import { ProFormRadio, ProFormText } from "~/components/pro-form-kit";
import { CustomTree } from "./custom-tree";
import { m } from "~/paraglide/messages";

export function FormItems(props: any) {
  const { menu, checkedKeys, onCheck } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography.Title
        level={5}
        style={{ marginBottom: 12, marginTop: 0, color: "var(--ant-color-text-heading)" }}
      >
        {m.system_role_basic_info()}
      </Typography.Title>
      <ProFormText
        name="name"
        label={m.system_role_field_name()}
        placeholder={m.system_role_field_name_placeholder()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
        fieldProps={{ allowClear: true, maxLength: 64 }}
      />
      <ProFormText
        name="value"
        label={m.system_role_field_value()}
        placeholder={m.system_role_field_value_placeholder()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
        fieldProps={{ allowClear: true }}
      />
      <ProFormText
        name="description"
        label={m.system_role_column_description()}
        placeholder={m.system_role_field_description_placeholder()}
        fieldProps={{ allowClear: true }}
      />
      <ProFormText
        name="remark"
        label={m.system_role_field_remark()}
        placeholder={m.tools_placeholder_enter()}
        fieldProps={{ allowClear: true }}
      />
      <ProFormRadio.Group
        name="status"
        label={m.system_role_field_status()}
        options={[
          { label: m.system_enabled(), value: 1 },
          { label: m.system_disabled(), value: 0 },
        ]}
        rules={[{ required: true, message: m.tools_placeholder_select() }]}
      />

      <Divider style={{ marginTop: 16, marginBottom: 16 }} />
      <Typography.Title
        level={5}
        style={{ marginBottom: 8, marginTop: 0, color: "var(--ant-color-text-heading)" }}
      >
        {m.system_role_field_menus()}
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12, fontSize: 14 }}>
        {m.system_role_field_menus_desc()}
      </Typography.Paragraph>
      <Form.Item name="menus" style={{ marginBottom: 0 }}>
        <CustomTree menu={menu} checkedKeys={checkedKeys} onCheck={onCheck} />
      </Form.Item>
    </div>
  );
}
