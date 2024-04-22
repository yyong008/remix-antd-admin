// types
import type dayjs from "dayjs";

import * as clientUtils from "~/utils";

type FormatTimeProps = {
  timeStr: string | number | Date | dayjs.Dayjs | null | undefined;
  format?: string;
};

export default function FormatTime({ timeStr, format }: FormatTimeProps) {
  return <>{timeStr ? clientUtils.formatDate(timeStr, format) : "-"}</>;
}
