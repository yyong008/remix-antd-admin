// components:vendor
import { Col } from "antd";

// cores
import styled from "styled-components";

const IWrap = styled.div`
  display: flex;
  justify-items: center;
`;

const ImgWrap = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
  margin-bottom: 10px;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
  }
`;

export default function Team({ data }: any) {
  return (
    <>
      {data.teams.map((item: any, index: number) => {
        return (
          <Col span={12} key={index}>
            <IWrap>
              <ImgWrap>
                <img src={item.url} alt="" />
              </ImgWrap>
              <div>{item.title}</div>
            </IWrap>
          </Col>
        );
      })}
    </>
  );
}
