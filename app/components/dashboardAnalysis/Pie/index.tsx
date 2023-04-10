import ReactChart from "echarts-for-react";

export default function MainPie({ pieData }: any) {
  const datas = pieData || [
    [
      { name: "家用电器", value: 4_544 },
      { name: "食用酒水", value: 3_321 },
      { name: "个人健康", value: 3_113 },
      { name: "服饰箱包", value: 2_341 },
      { name: "母婴产品", value: 1_231 },
      { name: "其它", value: 1_231 },
    ],
  ];

  const option = {
    title: {
      left: "center",
      label: {
        color: "#999",
        fontSize: 14,
      },
    },
    series: datas.map(function (data: any, idx: number) {
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
