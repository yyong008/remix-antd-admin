import { Tag } from "antd";

enum EStatusType {
  disable = 0,
  undisable = 1,
}

type StatusTypeProps = {
  status: EStatusType | null;
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
