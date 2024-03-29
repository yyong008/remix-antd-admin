import { Link, Outlet } from "@remix-run/react";
import { defaultLang } from "~/config/lang";
import { ADMIN_ROUTE_PREFIX } from "~/constants";

export default function Nav() {
  return (
    <div>
      <div className="flex justify-between items-center px-[200px] h-[40px] bg-slate-200">
        <div>
          <Link to="/" className="mr-[20px]">
            Home
          </Link>
          <Link to="/news" className="mr-[20px]">
            News
          </Link>
          <Link to="/blog" className="mr-[20px]">
            Blog
          </Link>
          <Link to="/about" className="mr-[20px]">
            About
          </Link>
        </div>
        <div>
          <Link
            to={`/${defaultLang}/${ADMIN_ROUTE_PREFIX}/login`}
            className="mr-[20px]"
          >
            Login
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
