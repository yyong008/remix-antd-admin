import { Card } from "antd";
import CardLoggerTable from "../CardLoggerTable";
import { useState } from "react";

export default function ThreeCardLoggerTable({ data }: any) {
  const [key, setKey] = useState("one");
  const tabList = [
    {
      tab: "操作日志一",
      key: "one",
      content: <CardLoggerTable />,
    },
    {
      tab: "操作日志2",
      key: "two",
    },
    {
      tab: "操作日志3",
      key: "three",
    },
  ];
  return (
    <Card
      tabList={tabList}
      activeTabKey={key}
      onTabChange={(k) => {
        setKey(k);
      }}
    >
      {key === "one" && <CardLoggerTable dataSource={data.card1} />}
      {key === "two" && <CardLoggerTable dataSource={data.card2} />}
      {key === "three" && <CardLoggerTable dataSource={data.card3} />}
    </Card>
  );
}
