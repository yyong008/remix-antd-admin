import * as uc from "~/utils/client";

import type dayjs from "dayjs";

type FormatTimeProps = {
	timeStr: string | number | Date | dayjs.Dayjs | null | undefined;
	format?: string;
};

export function FormatTime({ timeStr, format }: FormatTimeProps) {
	return <>{timeStr ? uc.formatDate(timeStr, format) : "-"}</>;
}
