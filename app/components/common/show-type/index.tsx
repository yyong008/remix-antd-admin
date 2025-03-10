import { Tag } from "antd";

type ShowTypeProps = {
  isShow: 0 | 1 | null;
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
