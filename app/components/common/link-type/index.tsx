import { Tag } from "antd";

type LinkTypeProps = {
  isLink: null | 0 | 1;
};

export function LinkType({ isLink }: LinkTypeProps) {
  return (
    <>
      {isLink === null && <>-</>}
      {isLink === 0 && <Tag>否</Tag>}
      {isLink === 1 && <Tag color={"green"}>是</Tag>}
    </>
  );
}
