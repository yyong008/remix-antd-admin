import { createContext } from "react";
import { defaultLang } from "~/config/lang";

export const SettingContext = createContext({
  theme: {
    colorPrimary: "",
    // layout: "mix"
  },
  setTheme: () => {},
  lang: defaultLang,
  setLang: () => {},
});

export default SettingContext;
