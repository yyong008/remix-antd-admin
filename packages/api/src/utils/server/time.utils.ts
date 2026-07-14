import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export { dayjs };

export function formatDate(time: string, format = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(time).format(format);
}

export function fromNow(time: string) {
  return dayjs(time).fromNow();
}

export function getTimezone() {
  return dayjs.tz.guess();
}

export function toTimezone(time: string, tz: string) {
  return dayjs(time).tz(tz).format();
}
