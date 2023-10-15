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

const RankNum = ({ num }: any) => {
  const { token } = theme.useToken();
  if (num === 1 || num === 2 || num === 3) {
    return (
      <span className="Rank123" color={token.colorPrimary}>
        {num}
      </span>
    );
  }
  return <span className="Rank">{num}</span>;
};

// eslint-disable-next-line react/display-name
export default function SealCardList() {
  return (
    <div className="RankListWrap">
      <div className="RankListTitle">门店销售额排名</div>
      {dataSource.map((item, index) => {
        return (
          <div className="RankListItem" key={index}>
            <div>
              <RankNum num={Number(item.name)} />
              <span>{item.desc}</span>
            </div>
            <span>{item.count}</span>
          </div>
        );
      })}
    </div>
  );
}
