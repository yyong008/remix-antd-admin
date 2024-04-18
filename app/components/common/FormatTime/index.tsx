// types
import type dayjs from "dayjs";

import { formatDate } from "~/utils/utils";

type FormatTimeProps = {
  timeStr: string | number | Date | dayjs.Dayjs | null | undefined;
  format?: string;
};

export default function FormatTime({ timeStr, format }: FormatTimeProps) {
  return <>{timeStr ? formatDate(timeStr, format) : "-"}</>;
}
