import { Tag } from "antd";

enum EMenuType {
  dir = 1,
  menu = 2,
  perm = 3,
}

type MenuTypeProps = {
  type: EMenuType;
};

export function MenuType({ type }: MenuTypeProps) {
  return (
    <>
      {type === 1 ? <Tag color="green">目录</Tag> : ""}
      {type === 2 ? <Tag color="blue">菜单</Tag> : ""}
      {type === 3 ? <Tag color="pink">权限</Tag> : ""}
    </>
  );
}
