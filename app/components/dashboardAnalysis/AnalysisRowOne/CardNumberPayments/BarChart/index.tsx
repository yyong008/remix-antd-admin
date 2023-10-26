// components:vendor
import { theme } from "antd";
import ReactEcharts from "echarts-for-react";

const BarChart = (props) => {
  const { token } = theme.useToken();
  const option = {
    grid: {
      top: "0%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: false,
    },
    xAxis: [
      {
        show: false,
        type: "category",
        data: props.xAxis.data,
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        show: false,
        type: "value",
        max: 9,
      },
    ],
    series: [
      {
        type: "bar",
        itemStyle: {
          color: token.colorPrimary,
        },
        data: props.series.data,
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: "46px" }} />;
};

export default BarChart;
