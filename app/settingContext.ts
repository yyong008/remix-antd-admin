import { createContext } from "react";

const SettingContext = createContext({
  theme: {
    colorPrimary: ''
  },
  setTheme: (theme: any) => { },
  lang: "zh",
  setLang: (v: any) => { },
});

export default SettingContext;
