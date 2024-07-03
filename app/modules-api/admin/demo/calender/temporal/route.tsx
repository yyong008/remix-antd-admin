import { CalRow, ImageComp } from "./components";
import { PageContainer, ProCard } from "@ant-design/pro-components";

export function Route() {
  return (
    <PageContainer>
      <ProCard>
        <ImageComp />
        <CalRow />
      </ProCard>
    </PageContainer>
  );
}
