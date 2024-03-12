// types
import type { Dayjs } from "dayjs";
import type { MetaFunction } from "@remix-run/node";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";

// components
import { Calendar } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { ProCard } from "@ant-design/pro-components";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "calendar",
    },
  ];
};

export default function CalendarAntd() {
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <PageContainer>
      <ProCard>
        <Calendar onPanelChange={onPanelChange} />
      </ProCard>
    </PageContainer>
  );
}
