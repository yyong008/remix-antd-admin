import { Tag } from "antd";

export default function CacheType({ isCache }: any) {
  return (
    <>
      {isCache === null && <>-</>}
      {isCache === 0 && <Tag>否</Tag>}
      {isCache === 1 && <Tag color={"green"}>是</Tag>}
    </>
  );
}
