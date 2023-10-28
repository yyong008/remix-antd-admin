import ReactChart from "echarts-for-react";

export default function MainPie({ datas }: any) {
  const option = {
    animation: false, // 关闭动画
    lazyUpdate: true, // 开启懒更新
    progressive: 500, // 设置增量渲染阈值
    title: {
      left: "center",
      label: {
        color: "#999",
        fontSize: 14,
      },
    },
    series: [datas].map(function (data: any, idx: number) {
      var top = idx * 33.3;
      return {
        type: "pie",
        radius: "100%",
        top: top + "%",
        height: "90%",
        left: "center",
        width: 500,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c}}",
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: "#999",
            },
          },
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80,
        },
        data: data,
      };
    }),
  };

  return (
    <>
      <ReactChart option={option} />
    </>
  );
}
