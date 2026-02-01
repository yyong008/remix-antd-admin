import { Button, message } from "antd";
import { DrawerForm, PageContainer, ProCard } from "@ant-design/pro-components";
import { useNavigate, useParams } from "react-router";

import { FormItems } from "./components/FormItems";
import { QuillEditor } from "~/components/common/quill-editor";
import { useState } from "react";
import { useCreateNews } from "~/api-client/queries/news";
import { useNewsCategoryList } from "~/api-client/queries/news-category";

export function Route() {
  const nav = useNavigate();
  const { lang } = useParams();
  const createNews = useCreateNews();
  const [content, setContent] = useState("");
  const { data: newsCategoryList, isLoading } = useNewsCategoryList({
    page: 1,
    pageSize: 200,
  });
  return (
    <PageContainer>
      <ProCard
        loading={isLoading}
        extra={
          <DrawerForm
            trigger={<Button type="primary">创建新闻</Button>}
            onFinish={async (v) => {
              const result = await createNews.mutateAsync(v);
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
            <FormItems newsCategoryList={newsCategoryList} />
          </DrawerForm>
        }
      >
        <div style={{ height: "400px" }}>
          <QuillEditor
            initContent={""}
            content={content}
            setContent={setContent}
          />
        </div>
      </ProCard>
    </PageContainer>
  );
}
