import { PageContainer, ProCard } from "@ant-design/pro-components";

import { BlogCreateForm } from "./components";

export function Route() {
  return (
    <PageContainer>
      <ProCard>
        <BlogCreateForm />
      </ProCard>
    </PageContainer>
  );
}
