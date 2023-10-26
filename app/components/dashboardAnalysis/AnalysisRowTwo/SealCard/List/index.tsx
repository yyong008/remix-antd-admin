// components
import { theme } from "antd";

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
export default function SealCardList({ list = [] }) {
  return (
    <div className="RankListWrap">
      <div className="RankListTitle">门店销售额排名</div>
      {list.map((item: any, index) => {
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
