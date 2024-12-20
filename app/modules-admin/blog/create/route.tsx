import { PageContainer, ProCard } from "@ant-design/pro-components";

import { CreateBlogForm } from "./components/CreateBlogForm";

export function Route() {
  return (
    <PageContainer>
      <ProCard>
        <CreateBlogForm />
      </ProCard>
    </PageContainer>
  );
}
