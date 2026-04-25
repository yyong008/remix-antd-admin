import { createContext } from "react";
import { defaultLang } from "~/config/lang";

export const SettingContext = createContext({
  theme: {
    colorPrimary: "",
  },
  setTheme: (theme: unknown) => {},
  lang: defaultLang,
  setLang: (v: unknown) => {},
});

export default SettingContext;
