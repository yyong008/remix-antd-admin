// components:vendor
import ReactEcharts from "echarts-for-react";

const HotSearchChart = () => {
  const option = {
    tooltip: {},
    xAxis: {
      type: "category",
      data: [
        "React",
        "JavaScript",
        "Node.js",
        "Vue",
        "CSS",
        "HTML",
        "TypeScript",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };

  return (
    <ReactEcharts option={option} style={{ height: "500px", width: "100%" }} />
  );
};

export default HotSearchChart;
