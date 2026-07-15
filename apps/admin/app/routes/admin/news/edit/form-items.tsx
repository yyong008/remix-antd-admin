import { ProFormDateTimePicker, ProFormSelect, ProFormText } from "~/components/pro-form-kit";

import { categoriesForNewsSelect } from "../category-select";
import { m } from "~/paraglide/messages";

export function FormItems(props: {
  newsCategoryList: { list?: Array<{ id: string; name: string; visible?: unknown }> } | undefined;
  activeCategoryId?: string;
}) {
  const { newsCategoryList, activeCategoryId } = props;
  return (
    <>
      <ProFormText
        label={m.news_edit_field_title()}
        name="title"
        rules={[{ required: true, message: m.news_edit_required_title() }]}
      />
      <ProFormText
        label={m.news_edit_field_author()}
        name="author"
        rules={[{ required: true, message: m.news_edit_required_author() }]}
      />
      <ProFormText
        label={m.news_edit_field_source()}
        name="source"
        rules={[{ required: true, message: m.news_edit_required_source() }]}
      />
      <ProFormDateTimePicker
        label={m.news_edit_field_published_at()}
        name="date"
        width={"100%" as any}
        rules={[{ required: true, message: m.news_edit_required_published_at() }]}
      />
      <ProFormSelect
        label={m.news_edit_field_category()}
        name="newsId"
        request={async () => {
          const ncs = newsCategoryList?.list || [];
          const pick = categoriesForNewsSelect(ncs, activeCategoryId);
          return pick.map((c) => ({ label: c.name, value: c.id })) as any;
        }}
        rules={[{ required: true, message: m.news_edit_required_category() }]}
      />
    </>
  );
}
