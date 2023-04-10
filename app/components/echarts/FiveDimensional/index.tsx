// components:vendor
import ReactEcharts from "echarts-for-react";

const option = {
  tooltip: {},
  radar: {
    indicator: [
      { name: "外向性", max: 100 },
      { name: "责任心", max: 100 },
      { name: "情绪稳定性", max: 100 },
      { name: "开放性", max: 100 },
      { name: "宜人性", max: 100 },
    ],
    center: ["50%", "50%"],
    radius: "80%",
  },
  series: [
    {
      type: "radar",
      data: [
        {
          value: [80, 70, 90, 60, 85],
          name: "五维图1",
        },
        {
          value: [90, 80, 93, 80, 90],
          name: "五维图2",
        },
        {
          value: [30, 20, 53, 60, 40],
          name: "五维图3",
        },
      ],
    },
  ],
};

const FiveDimensionalChart = () => {
  return <ReactEcharts option={option} />;
};

export default FiveDimensionalChart;
