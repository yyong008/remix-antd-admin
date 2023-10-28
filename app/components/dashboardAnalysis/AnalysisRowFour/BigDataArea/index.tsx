// components
import { theme } from "antd";
import ReactChart from "echarts-for-react";

export default function BigDataArea(props: any) {
  const { token } = theme.useToken();

  const option = {
    animation: true, // 关闭动画
    lazyUpdate: true, // 开启懒更新
    progressive: 500, // 设置增量渲染阈值
    grid: {
      top: "0%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      position: function (pt: any) {
        return [pt[0], "10%"];
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.date,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: "Fake Data",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: token.colorPrimary,
        },
        areaStyle: {},
        data: props.data,
      },
    ],
  };
  return (
    <>
      <ReactChart option={option} />
    </>
  );
}
