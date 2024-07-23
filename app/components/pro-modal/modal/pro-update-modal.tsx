import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { PModal } from "./modal-base";

function DefaultTiggerUpdate() {
  return (
    <Button type="primary" icon={<EditOutlined />}>
      更新
    </Button>
  );
}

export function PUpdateModal(props: any) {
  return <PModal trigger={<DefaultTiggerUpdate />} {...props} />;
}
