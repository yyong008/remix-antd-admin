// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json, useLoaderData, useParams } from "@remix-run/react";

// component
import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { PageContainer } from "@ant-design/pro-layout";
import { Editor } from "@tinymce/tinymce-react";
import { Form } from "antd";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";

// services
import { getUserId } from "~/services/common/auth.server";
import { createNews, getNewsById } from "~/services/news/news";
import { getFindNewsCategory } from "~/services/news/news-category";

// remix:action
export const action = async ({ params, request }: ActionFunctionArgs) => {
  const data = await request.json();
  const userId = await getUserId(request);
  const news = await createNews({
    ...data,
    userId,
    categoryId: data.newsId,
    publishedAt: data.date,
  });
  return json({
    code: 0,
    message: "success",
    data: news,
  });
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id } = params;
  return json({
    code: 0,
    data: {
      TINYMCE_KEY: process.env.TINYMCE_KEY,
      newsCategory: await getFindNewsCategory(),
      news: await getNewsById(Number(id)),
    },
    message: "success",
  });
};

export default function NewsEdit() {
  const [form] = Form.useForm();
  const fetcher = useFetcherChange();
  const { id } = useParams();
  const { data } = useLoaderData<typeof loader>();
  return (
    <PageContainer>
      <ProCard>
        <ProForm
          initialValues={{ ...data.news, date: data.news?.publishedAt }}
          onFinish={async (v) => {
            const vals = v;
            vals.id = id;
            fetcher.submit(vals, {
              method: id ? "PUT" : "POST", // 修改或新建
              encType: "application/json",
            });
            return true;
          }}
        >
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
              const ncs = data.newsCategory;
              return ncs?.map((c) => {
                return {
                  label: c.name,
                  value: c.id,
                };
              }) as any;
            }}
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          />
          <ProForm.Item
            label="编写新闻"
            name="content"
            rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
          >
            <EditorRichFromItem form={form} data={data} />
          </ProForm.Item>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}

function EditorRichFromItem(props: any) {
  return (
    <Editor
      apiKey={props.data.TINYMCE_KEY}
      init={{
        ai_request: false,
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table   | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
      }}
      value={props.value}
      onChange={(e) => {
        props.onChange(e.target.getContent());
      }}
    />
  );
}
