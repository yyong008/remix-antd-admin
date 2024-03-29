import { Tag } from "antd";

export default function ShowType({ isShow }: any) {
  return (
    <>
      {isShow === null && <>-</>}
      {isShow === 0 && <Tag>否</Tag>}
      {isShow === 1 && <Tag color={"green"}>是</Tag>}
    </>
  );
}
