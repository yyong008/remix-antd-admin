/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
// components
import { List } from "antd";
import { ProCard } from "@ant-design/pro-components";

const SecretSetting = ({ dataSource }: any) => {
  return (
    <ProCard title="安全设置" style={{ minHeight: "750px" }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item: any) => (
          <List.Item actions={[<a href="#"> 修改</a>]}>
            <List.Item.Meta
              style={{ display: "flex", alignItems: "center" }}
              title={<a href="#">{item.name?.last}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </ProCard>
  );
};

export default SecretSetting;
