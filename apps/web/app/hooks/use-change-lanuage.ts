import { useParams } from "react-router";
import { defaultLang } from "~/config/lang";

export function useChangeLocale(locale: "en" | "zh") {
  const params = useParams();
  return locale || params.locale || defaultLang;
}
