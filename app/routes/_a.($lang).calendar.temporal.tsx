// types

import type { MetaFunction } from "@remix-run/node";

// components
import CalRow from "~/components/temporal/calRow";
import ImageComp from "~/components/temporal/ImageComp";
import { ProCard } from "@ant-design/pro-components";
import { PageContainer } from "@ant-design/pro-layout";

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
        <div className="App">
          <ImageComp />
          <CalRow />
        </div>
      </ProCard>
    </PageContainer>
  );
}
