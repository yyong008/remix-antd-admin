import { Tag } from "antd";

export default function LinkType({ isLink }: any) {
  return (
    <>
      {isLink === null && <>-</>}
      {isLink === 0 && <Tag>否</Tag>}
      {isLink === 1 && <Tag color={"green"}>是</Tag>}
    </>
  );
}
