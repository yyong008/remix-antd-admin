import * as icons from "@ant-design/icons";
import { Tooltip } from "antd";

export default function IconBox({ children }) {
  const keys = Object.keys(icons)
    .map((icon) => {
      return icon.charAt(0) === icon.charAt(0).toUpperCase() ? icon : undefined;
    })
    .filter((icon) => icon);

  return (
    <div>
      <Tooltip
        placement="rightBottom"
        color="white"
        title={
          <div className="flex flex-col w-[230px] h-[300px]  overflow-x-auto text-gray-950">
            <h1 className="text-[22px] pb-[20px]">选择一个图标</h1>
            <div className="flex flex-wrap">
              {keys.map((key) => {
                const IconComp = icons[key];
                return (
                  <IconComp
                    key={key}
                    className="flex items-center justify-center w-[30px] h-[30px] cursor-pointer text-[20px] border-[1px]"
                  ></IconComp>
                );
              })}
            </div>
          </div>
        }
      >
        {children}
      </Tooltip>
    </div>
  );
}
