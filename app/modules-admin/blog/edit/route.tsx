import { PageContainer, ProCard } from "@ant-design/pro-components";
import {
  useReadBlogQuery,
  useUpdateBlogByIdMutation,
} from "@/apis-client/admin/blog/blog";

import { EditBlogForm } from "./components/EditBlogForm";
import { QuillEditor } from "@/components/common/quill-editor";
import { message } from "antd";
import { useParams } from "@remix-run/react";
import { useState } from "react";

export function Route() {
  const [content, setContent] = useState("");

  const { id } = useParams();
  const { data, isLoading } = useReadBlogQuery({ id });
  const [updateBlog, other] = useUpdateBlogByIdMutation();
  return (
    <PageContainer>
      <ProCard
        loading={isLoading}
        extra={
          <EditBlogForm
            loading={other.isLoading}
            data={data?.data || {}}
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
