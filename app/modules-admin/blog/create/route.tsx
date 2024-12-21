import { PageContainer, ProCard } from "@ant-design/pro-components";

import { CreateBlogForm } from "./components/CreateBlogForm";
import { QuillEditor } from "@/components/common/quill-editor";
import { useState } from "react";

export function Route() {
  const [content, setContent] = useState("");
  return (
    <PageContainer>
      <ProCard
        title="创建博客"
        style={{ height: 600 }}
        extra={<CreateBlogForm />}
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
