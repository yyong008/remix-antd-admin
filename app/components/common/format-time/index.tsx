import * as clientUtils from "~/utils/client";

// types
import type dayjs from "dayjs";

type FormatTimeProps = {
  timeStr: string | number | Date | dayjs.Dayjs | null | undefined;
  format?: string;
};

export default function FormatTime({ timeStr, format }: FormatTimeProps) {
  return <>{timeStr ? clientUtils.formatDate(timeStr, format) : "-"}</>;
}
