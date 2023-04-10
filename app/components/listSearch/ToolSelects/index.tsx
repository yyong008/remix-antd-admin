// components:vendor
import { Divider } from "antd";
import { ProCard } from "@ant-design/pro-components";

// components
import Owner from "../Owner";
import Category from "../Category";
import OtherOptions from "../OtherOptions";

export default function ToolSelect(props: any) {
  return (
    <ProCard>
      <Category />
      <Divider dashed />
      {!props.showOwner ? <Owner /> : null}
      {!props.showOwner ? <Divider dashed /> : null}
      <OtherOptions />
    </ProCard>
  );
}
