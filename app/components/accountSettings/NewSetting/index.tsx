// components
import { List, Switch } from "antd";
import { ProCard } from "@ant-design/pro-components";

const NewSetting = ({ dataSource }: any) => {
  return (
    <ProCard title="账户密码" style={{ minHeight: "750px" }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item: any) => (
          <List.Item actions={[<Switch />]}>
            <List.Item.Meta
              title={<a href="#">{item.name?.last}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </ProCard>
  );
};

export default NewSetting;
