import { createContext } from "react";

const SettingContext = createContext({
  theme: {},
  setTheme: (theme: any) => {},
  lang: "zh",
  setLang: (v: any) => {},
});

export default SettingContext;
