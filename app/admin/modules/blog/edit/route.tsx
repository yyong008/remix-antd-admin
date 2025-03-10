import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useEffect, useState } from "react";

import { EditBlogForm } from "./components/EditBlogForm";
import { QuillEditor } from "@/components/common/quill-editor";
import { message } from "antd";
import { useParams } from "react-router";

export function Route() {
  const [content, setContent] = useState("");

  const { id } = useParams();
  const { data, isLoading } = {
    data: { data: { content: "hello world" } },
    isLoading: false,
  };
  const [updateBlog, other] = [
    (...args: any): any => {},
    { isLoading: false },
  ]; // TODO

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);

  return (
    <PageContainer>
      <ProCard
        loading={isLoading}
        style={{ height: 600 }}
        extra={
          <EditBlogForm
            loading={other.isLoading}
            data={data?.data || {}}
            content={content}
            onFinish={async (v: any) => {
              const values = v;
              if (id) values.id = Number(id);
              const data = {
                type: "",
                data: {
                  ...values,
                },
              };
              const result: any = await updateBlog(data);

              if (result.data && result.data.code === 1) {
                message.error(result.data.message);
                return false;
              } else {
                message.success(result.data.message);
                return true;
              }
            }}
          />
        }
      >
        {
          <div style={{ height: "400px" }}>
            <QuillEditor
              initContent={data?.data.content || ""}
              content={content}
              setContent={setContent}
            />
          </div>
        }
      </ProCard>
    </PageContainer>
  );
}
