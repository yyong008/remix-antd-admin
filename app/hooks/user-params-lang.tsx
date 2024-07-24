import { defaultLang } from "@/config";
import { useParams } from "@remix-run/react";

export function useParamsLang() {
  const { lang } = useParams();
  if (!lang) {
    return { lang: defaultLang };
  }
  return { lang };
}
