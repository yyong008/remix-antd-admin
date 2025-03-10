import * as ic from "@ant-design/icons";

import { Dropdown, Input, Row, Segmented } from "antd";
import { useMemo, useState } from "react";

import { AntdIcon } from "../antd-icon";

const iconsKeys = Object.keys(ic)
  .filter((icon) => /[A-Z]/.test(icon[0]))
  .filter((icon) => icon !== "IconProvider");

type AntdIconSelectProps = {
  onChange?: (...args: any) => void;
  trigger?: any;
  classname?: string;
  selectIconStr: string;
};

export const AntdIconSelect = (props: AntdIconSelectProps) => {
  const [keyType, setKeyType] = useState("OutlinedKeys");
  const [filterKey, setFilterKey] = useState("");
  const iKeys: any = {
    OutlinedKeys: iconsKeys.filter((icon) => icon.includes("Outlined")),
    FilledKeys: iconsKeys.filter((icon) => icon.includes("Filled")),
    TwoToneKeys: iconsKeys.filter((icon) => icon.includes("TwoTone")),
  };
  const currentKey = useMemo(() => {
    return iKeys[keyType]?.filter(
      (icon: string) => icon.includes(filterKey) || filterKey === "",
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyType, filterKey]);
  return (
    <Dropdown
      className={props.classname}
      trigger={["click", "hover"]}
      dropdownRender={() => {
        return (
          <div className="flex flex-col w-[400px] h-[500px] bg-white overflow-hidden  p-[10px] gap-[10px] rounded-t-md shadow-md">
            <div className="flex items-center gap-3">
              <div className="text-[16px] font-bold">选择图标</div>
              <div>
                <Segmented<string>
                  options={["OutlinedKeys", "FilledKeys", "TwoToneKeys"]}
                  onChange={(value) => {
                    setKeyType(value);
                  }}
                />
              </div>
            </div>
            <div className="flex">
              <Input
                prefix={<ic.SearchOutlined />}
                placeholder="搜索图标"
                onChange={(v) => {
                  const value = v.target.value;
                  setFilterKey(value);
                }}
              />
            </div>
            <div className="flex flex-wrap overflow-y gap-4 overflow-y-auto p-[10px]">
              {currentKey.length > 0 ? (
                <Row gutter={16}>
                  {currentKey.map((icon: string) => {
                    return (
                      <div
                        key={icon}
                        className="flex justify-center w-[40px] h-[40px] items-center text-[20px] hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          props?.onChange?.(icon);
                        }}
                      >
                        <AntdIcon
                          name={icon}
                          key={icon}
                          className="text-[20px]"
                          styles={{ fontSize: "20px" }}
                        />
                      </div>
                    );
                  })}
                </Row>
              ) : (
                <div className="w-[100%] flex items-center justify-center text-center">
                  暂无数据
                </div>
              )}
            </div>
          </div>
        );
      }}
    >
      <div>
        {props.selectIconStr ? (
          <AntdIcon name={props.selectIconStr} />
        ) : (
          <ic.QuestionCircleOutlined />
        )}
      </div>
    </Dropdown>
  );
};
