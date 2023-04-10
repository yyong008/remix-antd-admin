// core
import styled from "styled-components";

// components
import { theme } from "antd";

const dataSource = [
  {
    name: "1",
    desc: "工专路 0 号店",
    count: "323,234",
  },
  {
    name: "2",
    desc: "工专路 1 号店",
    count: "323,234",
  },
  {
    name: "3",
    desc: "工专路 2 号店",
    count: "323,234",
  },
  {
    name: "4",
    desc: "工专路 3 号店",
    count: "323,234",
  },
  {
    name: "5",
    desc: "工专路 4 号店",
    count: "323,234",
  },
  {
    name: "6",
    desc: "工专路 5 号店",
    count: "323,234",
  },
  {
    name: "7",
    desc: "工专路 6 号店",
    count: "323,234",
  },
];

const RankListWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 32px 32px 32px;
`;

const RankListItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
`;

const RankListTitle = styled.div`
  margin-top: 16px;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
`;

const Rank123 = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-top: 1.5px;
  margin-right: 16px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  background-color: ${(props) => props.color || "#314659"};
  border-radius: 20px;
  color: #fff;
`;

const Rank = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-top: 1.5px;
  margin-right: 16px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  border-radius: 20px;
`;

const RankNum = ({ num }: any) => {
  const { token } = theme.useToken();
  if (num === 1 || num === 2 || num === 3) {
    return <Rank123 color={token.colorPrimary}>{num}</Rank123>;
  }
  return <Rank>{num}</Rank>;
};

// eslint-disable-next-line react/display-name
export default function SealCardList() {
  return (
    <RankListWrap>
      <RankListTitle>门店销售额排名</RankListTitle>
      {dataSource.map((item, index) => {
        return (
          <RankListItem key={index}>
            <div>
              <RankNum num={Number(item.name)} />
              <span>{item.desc}</span>
            </div>
            <span>{item.count}</span>
          </RankListItem>
        );
      })}
    </RankListWrap>
  );
}
