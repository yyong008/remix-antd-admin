// core
import styled from "styled-components";

// components:vendor
import {
  ClusterOutlined,
  ContactsOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Card, Divider, Row, Col } from "antd";

// components
import Tags from "./Tags";

const WrapDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivImageWrap = styled.div`
  width: 104px;
  height: 104px;
  border-radius: 50%;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const DivName = styled.div`
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
`;

const DivDesc = styled.div`
  box-sizing: border-box;
  margin-bottom: 24px;
  text-align: center;
`;

const LDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
  margin: 0px 0px 10px 0px;
`;

const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserInfoDiv = styled.div`
  margin-left: 10px;
`;

export default function PersonalCard({ team, tags, userInfo }: any) {
  return (
    <Card>
      <WrapDiv>
        <DivImageWrap>
          <img src="/remix.png" alt="" />
        </DivImageWrap>
        <DivName>{userInfo.name}</DivName>
        <DivDesc>{userInfo.desc}</DivDesc>
        <DetailDiv>
          <LDiv>
            <ContactsOutlined />
            <UserInfoDiv>{userInfo.contacts}</UserInfoDiv>
          </LDiv>
          <LDiv>
            <ClusterOutlined />
            <UserInfoDiv>{userInfo.jobs}</UserInfoDiv>
          </LDiv>
          <LDiv>
            <HomeOutlined />
            <UserInfoDiv>{userInfo.address}</UserInfoDiv>
          </LDiv>
        </DetailDiv>
      </WrapDiv>
      <Divider dashed={true} />
      <div className="tag">
        {/* // @ts-ignore */}
        <Tags ts={tags as any} />
      </div>
      <Divider dashed={true} />
      <div>
        <h3
          style={{
            marginBottom: 10,
          }}
        >
          团队
        </h3>
        <div>
          <Row gutter={[10, 10]}>
            {team.map((itm: any, i: number) => {
              return (
                <Col
                  key={i}
                  span={12}
                  style={{
                    display: "inline-flex",
                  }}
                >
                  <img
                    style={{
                      height: "24px",
                      width: "24px",
                      borderRadius: "50%",
                      marginRight: 10,
                    }}
                    src={itm.url}
                    alt=""
                  />
                  <div>{itm.name}</div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </Card>
  );
}
