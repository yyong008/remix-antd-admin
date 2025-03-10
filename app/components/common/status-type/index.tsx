import { Tag } from "antd";

type StatusTypeProps = {
  status: 0 | 1 | null;
};

export function StatusType({ status }: StatusTypeProps) {
  return (
    <>
      {status === null && <>-</>}
      {status === 0 && <Tag color={"red"}>禁用</Tag>}
      {status === 1 && <Tag color={"green"}>启用</Tag>}
    </>
  );
}
