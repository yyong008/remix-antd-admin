import { Form, Input, Switch } from "antd";
import { m } from "~/paraglide/messages";

export function ModalFormItems() {
  return (
    <>
      <Form.Item
        name="name"
        label={m.blog_category_field_name()}
        rules={[
          { required: true, message: m.blog_category_name_required() },
          { max: 64, message: m.blog_category_name_max() },
        ]}
      >
        <Input placeholder={m.blog_category_name_required()} allowClear />
      </Form.Item>
      <Form.Item
        name="description"
        label={m.blog_category_field_description()}
        rules={[{ max: 500, message: m.blog_category_desc_max() }]}
      >
        <Input.TextArea
          placeholder={m.blog_category_desc_placeholder()}
          rows={3}
          showCount
          maxLength={500}
          allowClear
        />
      </Form.Item>
      <Form.Item
        name="showOnClient"
        label={m.blog_category_field_show_on_client()}
        valuePropName="checked"
        initialValue={true}
      >
        <Switch
          checkedChildren={m.blog_category_visible_show()}
          unCheckedChildren={m.blog_category_visible_hide()}
        />
      </Form.Item>
    </>
  );
}
