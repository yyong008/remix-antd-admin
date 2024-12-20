import { DownOutlined } from "@ant-design/icons";

import { Dropdown } from "antd";
/* eslint-disable jsx-a11y/anchor-is-valid */
import type { MenuProps } from "antd";

const More: React.FC = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a href="#">编辑</a>,
    },
    {
      key: "2",
      label: <a href="#">删除</a>,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <a href="#" onClick={(e) => e.preventDefault()}>
        | 更多 <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default More;
