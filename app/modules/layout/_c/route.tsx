import { Nav } from "./components";
import { Outlet } from "@remix-run/react";
import { useNProgress } from "~/hooks";

export function Route() {
  useNProgress();
  return (
    <div className="flex justify-center relative bg-indigo-100 min-h-[100vh]">
      <Nav />
      <Outlet />
    </div>
  );
}
