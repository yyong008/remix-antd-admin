import { Tag } from "antd";

type CacheTypeProps = {
  isCache: 0 | 1 | null;
};

export function CacheType({ isCache }: CacheTypeProps) {
  return (
    <>
      {isCache === null && <>-</>}
      {isCache === 0 && <Tag>否</Tag>}
      {isCache === 1 && <Tag color={"green"}>是</Tag>}
    </>
  );
}
