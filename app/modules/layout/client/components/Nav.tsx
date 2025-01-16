import { HeaderLink, HeaderLinkLogin } from "./HeaderLink";

import { defaultLang } from "@/config/lang"; // must import lang no use config (in server)
import { useParams } from "react-router";

export function Nav() {
  const { lang = defaultLang } = useParams();
  // return 123
  return (
    <div className="absolute flex justify-between items-center mt-[20px] mx-0 my-auto w-[60vw] px-[40px] h-[60px]  rounded-[20px] border bg-white shadow-lg">
      <div className="flex items-center">
        <div className="flex items-center  mr-[20px] gap-3">
          <img className="w-[30px]" src="/logo.png" alt="" />
          <span className="font-bold">Remix Antd Admin</span>
        </div>
        <HeaderLink to={`/${lang}`} end={true}>
          Home
        </HeaderLink>
        <HeaderLink to={`/${lang}/news`} end={true}>
          News
        </HeaderLink>
        <HeaderLink to={`/${lang}/blog`} end={true}>
          Blog
        </HeaderLink>
        <HeaderLink to={`/${lang}/about`} end={true}>
          About
        </HeaderLink>
      </div>
      <div>
        <HeaderLinkLogin to={`/${lang}/admin/login`} end={true}>
          Login
        </HeaderLinkLogin>
      </div>
    </div>
  );
}
