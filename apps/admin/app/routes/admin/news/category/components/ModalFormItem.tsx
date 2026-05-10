import { Form, Input, Switch, Tooltip } from "antd";

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
        label="分类名称"
        rules={[
          { required: true, message: "请输入分类名称" },
          { max: 64, message: "不超过 64 字" },
        ]}
      >
        <Input placeholder="请输入分类名称" allowClear />
      </Form.Item>
      <Form.Item name="description" label="描述" rules={[{ max: 500, message: "不超过 500 字" }]}>
        <Input.TextArea
          placeholder="选填，简要说明该分类用途"
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
            客户端展示
            <Tooltip title="关闭后，该分类不会出现在新闻列表左侧与新建新闻的分类下拉里；已关联的新闻不受影响。">
              <span style={{ color: "#9ca3af", cursor: "help" }}>[?]</span>
            </Tooltip>
          </span>
        }
        valuePropName="checked"
        style={{ marginBottom: 0 }}
      >
        <Switch checkedChildren="展示" unCheckedChildren="隐藏" />
      </Form.Item>
    </div>
  );
}
