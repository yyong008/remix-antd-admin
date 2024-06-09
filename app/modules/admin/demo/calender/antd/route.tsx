import { Calendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import { PageContainer } from "@ant-design/pro-components";

export function Route() {
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log();
  };

  return (
    <PageContainer>
      <Calendar onPanelChange={onPanelChange} />
    </PageContainer>
  );
}
