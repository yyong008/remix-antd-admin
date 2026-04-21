import { ProFormDateTimePicker, ProFormSelect, ProFormText } from "~/components/pro-form-kit";

import { categoriesForNewsSelect } from "../../news-category-select";

export function FormItems(props: { newsCategoryList: any; activeCategoryId?: string }) {
  const { newsCategoryList, activeCategoryId } = props;
  return (
    <>
      <ProFormText
        label="新闻标题"
        name="title"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        label="新闻作者"
        name="author"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        label="新闻来源"
        name="source"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormDateTimePicker
        label="新闻发布时间"
        name="date"
        width={"100%" as any}
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormSelect
        label="分类"
        name="newsId"
        request={async () => {
          const ncs = newsCategoryList?.list || [];
          const pick = categoriesForNewsSelect(ncs, activeCategoryId);
          return pick.map((c) => ({ label: c.name, value: c.id })) as any;
        }}
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
    </>
  );
}
