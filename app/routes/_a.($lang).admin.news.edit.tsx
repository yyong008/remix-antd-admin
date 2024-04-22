// remix
import { useLoaderData, useParams } from "@remix-run/react";

// components
import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Form } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { PageContainer } from "@ant-design/pro-layout";

// hooks
import { useFetcherChange } from "~/hooks";

// controller
import { AdminNewsEditController } from "~/server/controllers/admin.news.edit.controller";

// action-loader
export const action = AdminNewsEditController.action;
export const loader = AdminNewsEditController.loader;

export default function NewsEdit() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const fetcher = useFetcherChange();
  const { data } = useLoaderData<typeof loader>();

  return (
    <PageContainer>
      <ProCard>
        <ProForm
          onFinish={async (v) => {
            const vals = v;
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
