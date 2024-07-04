import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useNavigate, useParams } from "@remix-run/react";

import { message } from "antd";
import { useCreateNewsMutation } from "@/apis-client/admin/news/news";
import { useReadNewsCategoryListQuery } from "@/apis-client/admin/news/category";

export function Route() {
  const nav = useNavigate();
  const { lang } = useParams();
  const [createNews] = useCreateNewsMutation();
  const { data: newsCategoryList, isLoading } = useReadNewsCategoryListQuery({
    page: 1,
    pageSize: 1000,
  });
  return (
    <PageContainer>
      <ProCard loading={isLoading}>
        <ProForm
          onFinish={async (v) => {
            const result = await createNews(v);
            if (result.data?.code !== 0) {
              message.error(result.data?.message);
              return false;
            }
            message.success(result.data?.message);
            nav(`/${lang}/admin/news/result`, {
              state: { title: v.title, id: result.data.data.id },
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
              const ncs = newsCategoryList?.data?.list || [];
              return ncs?.map((c: any) => {
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
            <ProFormTextArea />
          </ProForm.Item>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}
