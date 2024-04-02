import { NavLink, Outlet } from "@remix-run/react";
import { defaultLang } from "~/config/lang";
import { ADMIN_ROUTE_PREFIX } from "~/constants";

export default function Nav() {
  return (
    <div className="flex justify-center relative bg-indigo-100 min-h-[100vh]">
      <div
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/20574181/pexels-photo-20574181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
        className="absolute flex justify-between items-center mt-[20px] mx-0 my-auto w-[70vw] px-[100px] h-[60px] bg-indigo-300 rounded-[20px] shadow-indigo-500 shadow-lg"
      >
        <div>
          <NavLink
            to="/"
            className={({ isActive, isPending }) => {
              return isActive
                ? "mr-[20px] bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50"
                : "mr-[20px] hover:bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50";
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive, isPending }) => {
              return isActive
                ? "mr-[20px] bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50"
                : "mr-[20px] hover:bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50";
            }}
          >
            News
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive, isPending }) => {
              return isActive
                ? "mr-[20px] bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50"
                : "mr-[20px] hover:bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50";
            }}
          >
            Blog
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive, isPending }) => {
              return isActive
                ? "mr-[20px] bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50"
                : "mr-[20px] hover:bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50";
            }}
          >
            About
          </NavLink>
        </div>
        <div>
          <NavLink
            to={`/${defaultLang}/${ADMIN_ROUTE_PREFIX}/login`}
            className={({ isActive, isPending }) => {
              return isActive
                ? "mr-[20px] bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50"
                : "mr-[20px] hover:bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50";
            }}
          >
            Login
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
