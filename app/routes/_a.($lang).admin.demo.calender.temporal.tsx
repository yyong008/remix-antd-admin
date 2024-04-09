// types
import type { MetaFunction } from "@remix-run/node";

// components
import { ProCard } from "@ant-design/pro-components";
import { PageContainer } from "@ant-design/pro-layout";
import CalRow from "~/components/calendar/temporal/calRow";
import ImageComp from "~/components/calendar/temporal/ImageComp";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "calendar-template",
    },
  ];
};

export default function Calendar() {
  return (
    <PageContainer>
      <ProCard>
        <ImageComp />
        <CalRow />
      </ProCard>
    </PageContainer>
  );
}
