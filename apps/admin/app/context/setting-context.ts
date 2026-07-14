import { createContext } from "react";
import { defaultLang } from "~/config/lang";

export const SettingContext = createContext({
  theme: {
    colorPrimary: "",
  },
  setTheme: (_theme: unknown) => {},
  lang: defaultLang,
  setLang: (_v: unknown) => {},
});

export default SettingContext;
