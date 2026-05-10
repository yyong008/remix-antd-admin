import { Tag } from "antd";

enum EShowType {
  unshow = 0,
  show = 1,
}

type ShowTypeProps = {
  isShow: EShowType | null;
};

export function ShowType({ isShow }: ShowTypeProps) {
  return (
    <>
      {isShow === null && <>-</>}
      {isShow === 0 && <Tag>否</Tag>}
      {isShow === 1 && <Tag color={"green"}>是</Tag>}
    </>
  );
}
