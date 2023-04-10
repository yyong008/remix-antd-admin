// core
import styled from "styled-components";

// components:vendor
import { List, Avatar, theme } from "antd";

const TSpan = styled.span`
  color: ${(props) => props.color};
`;

const TItem = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #000;
`;

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
                <TItem>
                  <span>{"五月天"}</span> 在
                  <TSpan color={token.colorPrimary}> {"高逼格设计天团"} </TSpan>
                  新建项目{" "}
                  <TSpan color={token.colorPrimary}> {"六月迭代"} </TSpan>
                </TItem>
                <div style={{ margin: "10px 0px" }}>几分钟前</div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}
