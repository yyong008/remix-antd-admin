import { Form, Input } from "antd";
import { m } from "~/paraglide/messages";

export function ModalFormItems() {
  return (
    <>
      <Form.Item
        name="name"
        label={m.blog_tag_field_name()}
        rules={[
          { required: true, message: m.blog_tag_name_required() },
          { max: 64, message: m.blog_tag_name_max() },
        ]}
      >
        <Input placeholder={m.blog_tag_name_required()} allowClear />
      </Form.Item>
      <Form.Item
        name="description"
        label={m.blog_tag_field_description()}
        rules={[{ max: 200, message: m.blog_tag_desc_max() }]}
      >
        <Input.TextArea
          placeholder={m.blog_tag_desc_placeholder()}
          rows={3}
          showCount
          maxLength={200}
          allowClear
        />
      </Form.Item>
    </>
  );
}
