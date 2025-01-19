import { Button, message } from "antd";
import { DrawerForm, PageContainer, ProCard } from "@ant-design/pro-components";
import { useNavigate, useParams } from "react-router";

import { FormItems } from "./components/FormItems";
import { QuillEditor } from "~/components/common/quill-editor";
import { useState } from "react";

export function Route() {
  const nav = useNavigate();
  const { lang } = useParams();
  const [createNews] = [(...args: any): any => {}];
  const [content, setContent] = useState("");
  const { data: newsCategoryList, isLoading } = { data: [], isLoading: false };
  return (
    <PageContainer>
      <ProCard
        loading={isLoading}
        extra={
          <DrawerForm
            trigger={<Button type="primary">创建新闻</Button>}
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
