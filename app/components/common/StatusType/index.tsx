import { Tag } from "antd";

export default function StatusType({ status }: any) {
  return (
    <>
      {status === null && <>-</>}
      {status === 0 && <Tag color={"red"}>禁用</Tag>}
      {status === 1 && <Tag color={"green"}>启用</Tag>}
    </>
  );
}
