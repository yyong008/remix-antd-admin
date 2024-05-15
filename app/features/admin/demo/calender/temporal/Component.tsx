import CalRow from "~/components/calendar/temporal/calRow";
import ImageComp from "~/components/calendar/temporal/ImageComp";
import { PageContainer } from "@ant-design/pro-layout";
import { ProCard } from "@ant-design/pro-components";

export function Component() {
  return (
    <PageContainer>
      <ProCard>
        <ImageComp />
        <CalRow />
      </ProCard>
    </PageContainer>
  );
}
