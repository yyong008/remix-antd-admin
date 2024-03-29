import { theme } from "antd";
import ReactEcharts from "echarts-for-react";

const DiseaseChart = () => {
  const { token } = theme.useToken();
  // 定义数据
  const diseases = [
    "颈椎病",
    "视力问题",
    "手部和手腕问题",
    "肥胖问题",
    "焦虑和抑郁",
  ];
  const incidenceRates = [70, 60, 30, 50, 40]; // 模拟数据，根据实际情况修改

  // 配置图表选项
  const options = {
    title: {
      text: "程序员常见疾病发病率",
      subtext: "数据仅供参考",
      left: "center",
    },
    tooltip: {},
    xAxis: {
      data: diseases,
    },
    yAxis: {},
    series: [
      {
        name: "发病率",
        type: "bar",
        data: incidenceRates,
        itemStyle: {
          color: token.colorPrimary, // 设置柱状图的颜色
        },
      },
    ],
  };

  return (
    <ReactEcharts option={options} style={{ height: "400px", width: "100%" }} />
  );
};

export default DiseaseChart;
