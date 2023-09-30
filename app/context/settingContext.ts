import { createContext } from "react";

type ISettings = {
  colorPrimary: string;
  contentWidth: string
  fixSiderbar: boolean
  layout: string
  navTheme: string
}

const SettingContext = createContext({
  theme: {
    colorPrimary: '',
    // layout: "mix"
  },
  setTheme: (theme: any) => {
  },
  lang: "en-US",
  setLang: (v: any) => { },
});

export default SettingContext;
