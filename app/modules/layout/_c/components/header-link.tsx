import { NavLink, useParams } from "@remix-run/react";

import type { ReactNode } from "react";
import { defaultLang } from "~/config";

export const HeaderLink = ({
  to,
  end,
  children,
}: {
  to: string;
  end: boolean;
  children: ReactNode;
}) => {
  const { lang = defaultLang } = useParams();
  return (
    <NavLink
      to={`/${lang}`}
      end={end ?? true}
      className={({ isActive, isPending }) => {
        return isActive
          ? "mr-[20px] bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50"
          : "mr-[20px] hover:bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50";
      }}
    >
      {children}
    </NavLink>
  );
};
