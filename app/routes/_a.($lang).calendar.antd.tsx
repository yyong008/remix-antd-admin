// types
import type { Dayjs } from "dayjs";
import type { MetaFunction } from "@remix-run/node";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";

// components
import { Calendar } from "antd";

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

  return <Calendar onPanelChange={onPanelChange} />;
}
