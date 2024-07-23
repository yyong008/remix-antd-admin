import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { PModal } from "./modal-base";

function DefaultTiggerCreate() {
  return (
    <Button type="primary" icon={<EditOutlined />}>
      新建
    </Button>
  );
}

export function PCreateModal(props: any) {
  return <PModal trigger={<DefaultTiggerCreate />} {...props} />;
}
