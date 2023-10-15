// core

// components:vendor
import { List, Avatar, theme, Space } from "antd";

export default function DynamicList({ data }: any) {
  const { token } = theme.useToken();
  return (
    <List
      itemLayout="horizontal"
      dataSource={data.list}
      renderItem={(item: any, index: number) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={"/logo.png"} />}
            description={
              <div>
                <Space>
                  <span>{"五月天"}</span> 在
                  <div color={token.colorPrimary}> {"高逼格设计天团"} </div>
                  新建项目 <div color={token.colorPrimary}> {"六月迭代"} </div>
                </Space>
                <div style={{ margin: "10px 0px" }}>几分钟前</div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}
