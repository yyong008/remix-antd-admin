import { createContext } from "react";
import { defaultLang } from "~/config/lang";

const SettingContext = createContext({
  theme: {
    colorPrimary: "",
    // layout: "mix"
  },
  setTheme: (theme: any) => {},
  lang: defaultLang,
  setLang: (v: any) => {},
});

export default SettingContext;
