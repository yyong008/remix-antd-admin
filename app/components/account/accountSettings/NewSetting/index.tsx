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
          <List.Item actions={[<Switch key={item.id} />]}>
            <List.Item.Meta
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
