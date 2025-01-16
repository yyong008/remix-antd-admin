import { defaultLang } from "@/config/lang";
import { useParams } from "react-router";

export function useParamsLang() {
  const { lang } = useParams();
  if (!lang) {
    return { lang: defaultLang };
  }
  return { lang };
}
