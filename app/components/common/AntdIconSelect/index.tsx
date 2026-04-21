import * as ic from "@ant-design/icons";

import { Dropdown, Flex, Input, Row, Segmented } from "antd";
import { useMemo, useState } from "react";

import { AntdIcon } from "../antd-icon";

const iconsKeys = Object.keys(ic)
  .filter((icon) => /[A-Z]/.test(icon[0]))
  .filter((icon) => icon !== "IconProvider");

type AntdIconSelectProps = {
  onChange?: (icon: string) => void;
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
    return iKeys[keyType]?.filter((icon: string) => icon.includes(filterKey) || filterKey === "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyType, filterKey]);
  return (
    <Dropdown
      className={props.classname}
      trigger={["click", "hover"]}
      popupRender={() => {
        return (
          <Flex
            vertical
            style={{
              width: 400,
              height: 500,
              background: "#fff",
              overflow: "hidden",
              padding: 10,
              gap: 10,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <Flex align="center" gap={12}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>选择图标</div>
              <Segmented<string>
                options={["OutlinedKeys", "FilledKeys", "TwoToneKeys"]}
                onChange={(value) => {
                  setKeyType(value);
                }}
              />
            </Flex>
            <Input
              prefix={<ic.SearchOutlined />}
              placeholder="搜索图标"
              onChange={(v) => {
                const value = v.target.value;
                setFilterKey(value);
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                overflowY: "auto",
                padding: 10,
                flex: 1,
                minHeight: 0,
              }}
            >
              {currentKey.length > 0 ? (
                <Row gutter={16} style={{ width: "100%" }}>
                  {currentKey.map((icon: string) => {
                    return (
                      <div
                        key={icon}
                        role="button"
                        tabIndex={0}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          alignItems: "center",
                          fontSize: 20,
                          cursor: "pointer",
                          borderRadius: 4,
                        }}
                        onClick={() => {
                          props?.onChange?.(icon);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") props?.onChange?.(icon);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f0f0f0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "";
                        }}
                      >
                        <AntdIcon name={icon} key={icon} styles={{ fontSize: "20px" }} />
                      </div>
                    );
                  })}
                </Row>
              ) : (
                <Flex style={{ width: "100%" }} align="center" justify="center">
                  暂无数据
                </Flex>
              )}
            </div>
          </Flex>
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
