import { Form, Switch } from "antd";
import { ProFormDateTimePicker, ProFormSelect, ProFormText } from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";

export function FormItems(props: {
  categoryList: { list?: Array<{ id: string; name: string }> } | undefined;
  tagList: { list?: Array<{ id: string; name: string }> } | undefined;
}) {
  const { categoryList, tagList } = props;
  return (
    <>
      <ProFormText
        label={m.blog_edit_field_title()}
        name="title"
        rules={[{ required: true, message: m.blog_edit_required_title() }]}
      />
      <ProFormText
        label={m.blog_edit_field_author()}
        name="author"
        rules={[{ required: true, message: m.blog_edit_required_author() }]}
      />
      <ProFormDateTimePicker
        label={m.blog_edit_field_published_at()}
        name="publishedAt"
        width={"100%" as any}
        rules={[{ required: true, message: m.blog_edit_required_published_at() }]}
      />
      <ProFormSelect
        label={m.blog_edit_field_category()}
        name="categoryId"
        request={async () => {
          return (categoryList?.list || []).map((c) => ({
            label: c.name,
            value: c.id,
          })) as any;
        }}
        rules={[{ required: true, message: m.blog_edit_required_category() }]}
      />
      <ProFormSelect
        label={m.blog_edit_field_tag()}
        name="tagId"
        request={async () => {
          return (tagList?.list || []).map((t) => ({
            label: t.name,
            value: t.id,
          })) as any;
        }}
        rules={[{ required: true, message: m.blog_edit_required_tag() }]}
      />
      <Form.Item
        label={m.blog_edit_field_is_published()}
        name="isPublished"
        valuePropName="checked"
      >
        <Switch
          checkedChildren={m.blog_edit_publish_yes()}
          unCheckedChildren={m.blog_edit_publish_no()}
        />
      </Form.Item>
    </>
  );
}
