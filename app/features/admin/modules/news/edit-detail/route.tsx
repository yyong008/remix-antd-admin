import { Button, message } from "antd";
import { DrawerForm, PageContainer, ProCard } from "@ant-design/pro-components";

import { FormItems } from "./components/FormItems";
import { QuillEditor } from "@/components/common/quill-editor";
import { useParams } from "react-router";
import { useState } from "react";

export function Route() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const { data: newsCategoryList } = { data: [] };
  const { data, isLoading } = { data: { data: {} as any }, isLoading: false }; // useGetNewsByIdQuery(id);
  const [updateNewsById] = [(...args: any): any => {}];
  return (
    <PageContainer>
      <ProCard
        loading={isLoading}
        extra={
          <DrawerForm
            trigger={<Button type="primary">编辑新闻</Button>}
            initialValues={{ ...data?.data, date: data?.data?.publishedAt }}
            onFinish={async (v) => {
              const data = v;
              data.id = Number(id);
              const result = await updateNewsById(data);
              if (result.data?.code !== 0) {
                message.error(result.data?.message);
                return false;
              }
              message.success(result.data?.message);
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
