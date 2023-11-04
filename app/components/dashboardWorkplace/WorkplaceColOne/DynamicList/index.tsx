import { List, Avatar, theme, Space } from "antd";

export default function DynamicList({ data }: any) {
  debugger;
  const { token } = theme.useToken();
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item: any, index: number) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            description={
              <div>
                <Space>
                  <span style={{ fontWeight: 600, color: token.colorPrimary }}>
                    {item.name}
                  </span>{" "}
                  在
                  <div style={{ color: token.colorPrimary }}> {item.team} </div>
                  <span>新建项目</span>
                  <div style={{ color: token.colorPrimary }}>
                    {" "}
                    {item.project}{" "}
                  </div>
                </Space>
                <div style={{ margin: "10px 0px" }}>{item.time}</div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}
