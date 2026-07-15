import { Form, Input, Switch, Tooltip } from "antd";

import { m } from "~/paraglide/messages";

export function normalizeNewsCategoryValues(values: Record<string, unknown>) {
  const name = String(values.name ?? "").trim();
  const descRaw = values.description;
  const description =
    typeof descRaw === "string" ? descRaw.trim() : descRaw != null ? String(descRaw).trim() : "";
  const visible =
    values.visible !== false &&
    values.visible !== 0 &&
    values.visible !== "0" &&
    values.visible !== "false";
  return { name, description, visible };
}

export function ModalFormItems() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Form.Item
        name="name"
        label={m.news_category_field_name()}
        rules={[
          { required: true, message: m.news_category_name_required() },
          { max: 64, message: m.news_category_name_max() },
        ]}
      >
        <Input placeholder={m.news_category_name_required()} allowClear />
      </Form.Item>
      <Form.Item
        name="description"
        label={m.news_category_field_description()}
        rules={[{ max: 500, message: m.news_category_desc_max() }]}
      >
        <Input.TextArea
          placeholder={m.news_category_desc_placeholder()}
          rows={3}
          showCount
          maxLength={500}
          allowClear
        />
      </Form.Item>
      <Form.Item
        name="visible"
        label={
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {m.news_category_field_visible()}
            <Tooltip title={m.news_category_field_visible_tip()}>
              <span style={{ color: "#9ca3af", cursor: "help" }}>[?]</span>
            </Tooltip>
          </span>
        }
        valuePropName="checked"
        style={{ marginBottom: 0 }}
      >
        <Switch
          checkedChildren={m.news_category_visible_show()}
          unCheckedChildren={m.news_category_visible_hide()}
        />
      </Form.Item>
    </div>
  );
}
