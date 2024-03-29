import { formatDate } from "~/utils/utils";

export default function FormatTime({ timeStr }: any) {
  return <>{timeStr ? formatDate(timeStr) : "-"}</>;
}
