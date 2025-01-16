import { Button, message } from "antd";
import { DrawerForm, PageContainer, ProCard } from "@ant-design/pro-components";
import {
  useReadNewsQuery,
  useUpdateNewsByIdMutation,
} from "@/apis-client/admin/news/news";

import { FormItems } from "./components/FormItems";
import { QuillEditor } from "@/components/common/quill-editor";
import { useParams } from "react-router";
import { useReadNewsCategoryListQuery } from "@/apis-client/admin/news/category";
import { useState } from "react";

export function Route() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const { data: newsCategoryList } = useReadNewsCategoryListQuery({
    page: 1,
    pageSize: 1000,
  });
  const { data, isLoading } = useReadNewsQuery(id);
  const [updateNewsById] = useUpdateNewsByIdMutation();
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
