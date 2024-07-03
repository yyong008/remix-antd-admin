import ReactEchart from "echarts-for-react";

export default function DynamicData(props: { activeMonitorData: any }) {
  const { activeMonitorData: data } = props;
  let option = {
    grid: {
      top: "0%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        params = params[0];
        var date = new Date(params.name);
        return (
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear() +
          " : " +
          params.value[1]
        );
      },
      axisPointer: {
        animation: false,
      },
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        rotate: 40,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        rotate: 40,
      },
    },
    series: [
      {
        name: "Fake Data",
        type: "line",
        showSymbol: false,
        data: data,
      },
    ],
  };
  return (
    <ReactEchart option={option} style={{ width: "100%", height: "300px" }} />
  );
}
