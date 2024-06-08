import { Outlet, useParams } from "@remix-run/react";

import { HeaderLink } from "./components";
import { defaultLang } from "~/config/lang";
import { useNProgress } from "~/hooks";

export function Route() {
  const { lang = defaultLang } = useParams();
  useNProgress();
  return (
    <div className="flex justify-center relative bg-indigo-100 min-h-[100vh]">
      <div
        className="absolute flex justify-between items-center mt-[20px] mx-0 my-auto w-[70vw] px-[100px] h-[60px] bg-indigo-300 rounded-[20px] shadow-indigo-500 shadow-lg
          bg-[url(https://images.pexels.com/photos/20574181/pexels-photo-20574181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)]
        "
      >
        <div>
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
          <HeaderLink to={`/${lang}/amdin/login`} end={true}>
            Login
          </HeaderLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
