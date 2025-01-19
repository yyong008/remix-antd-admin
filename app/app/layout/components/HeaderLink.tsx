import { ArrowRightOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
import type { ReactNode } from "react";

export const HeaderLink = ({
  to,
  end,
  children,
}: {
  to: string;
  end: boolean;
  children: ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      end={end ?? true}
      className={({ isActive }) => {
        return isActive
          ? "mr-[20px] bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50"
          : "mr-[20px] hover:bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50";
      }}
    >
      {children}
    </NavLink>
  );
};

export const HeaderLinkLogin = ({
  to,
  end,
  children,
}: {
  to: string;
  end: boolean;
  children: ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      end={end ?? true}
      className={({ isActive }) => {
        return isActive
          ? "mr-[20px] bg-yellow-300 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl  border-gray-50"
          : "mr-[20px] bg-gray-700 hover:bg-yellow-300 text-gray-50 px-[10px] py-[10px] rounded-[10px] hover:text-gray-900 hover:shadow-xl hover:rounded-[100px]  border-gray-50";
      }}
    >
      {children}
      <ArrowRightOutlined />
    </NavLink>
  );
};
