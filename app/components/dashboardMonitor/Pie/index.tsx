// components:vendor
import ReactEcharts from "echarts-for-react";

const ProgressChart = ({ color }: any) => {
  const option = {
    series: [
      {
        type: "pie",
        radius: ["70%", "90%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 70, name: "完成率: 70%" },
          { value: 30, name: "未完成: 30%" },
        ],
      },
    ],
  };
  return <ReactEcharts option={option} />;
};

export default ProgressChart;
