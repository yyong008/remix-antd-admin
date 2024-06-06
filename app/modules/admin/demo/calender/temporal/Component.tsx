import { PageContainer, ProCard } from "@ant-design/pro-components";

import CalRow from "~/components/calendar/temporal/calRow";
import ImageComp from "~/components/calendar/temporal/ImageComp";

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
