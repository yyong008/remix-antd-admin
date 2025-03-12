import { useTranslation } from "react-i18next";

export function useTableShowTotal() {
  const { t: tableT } = useTranslation("table");
  return (total: number, range: number[]) => {
    return tableT("show_total", {
      start: range[0],
      end: range[1],
      total,
    });
  };
}
