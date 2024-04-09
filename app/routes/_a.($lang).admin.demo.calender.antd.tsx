// types
import type { Dayjs } from "dayjs";
import type { MetaFunction } from "@remix-run/node";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";

// components
import { Calendar } from "antd";
import { PageContainer } from "@ant-design/pro-layout";

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
    console.log();
  };

  return (
    <PageContainer>
      <Calendar onPanelChange={onPanelChange} />
    </PageContainer>
  );
}
