import { Tag } from "antd";

export default function MenuType({ type }: any) {
  return (
    <>
      {type === 1 ? <Tag color="green">目录</Tag> : ""}
      {type === 2 ? <Tag color="blue">菜单</Tag> : ""}
      {type === 3 ? <Tag color="pink">权限</Tag> : ""}
    </>
  );
}
