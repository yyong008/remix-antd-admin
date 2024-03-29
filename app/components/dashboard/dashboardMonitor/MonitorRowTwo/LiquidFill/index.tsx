// components:vendor
import "echarts-liquidfill-ssr";
import ReactEcharts from "echarts-for-react";

const LiquidFill = () => {
  var option = {
    series: [
      {
        type: "liquidFill",
        data: [
          {
            value: 0.8,
            fontSize: 10,
            itemStyle: {
              color: "red",
              opacity: 0.6,
            },
          },
          0.4,
          {
            value: 0.3,
            itemStyle: {
              color: "red",
              opacity: 0.6,
              fontSize: 10,
            },
            emphasis: {
              itemStyle: {
                opacity: 0.9,
                fontSize: 10,
              },
            },
          },
        ],
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default LiquidFill;
