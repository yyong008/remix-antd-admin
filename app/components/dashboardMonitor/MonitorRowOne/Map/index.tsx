// core
import { useMemo } from "react";

// components
import { theme } from "antd";
import ReactEchart from "echarts-for-react";

// utils
import * as echarts from "echarts";

const ChinaMap = (props: { geoJson: any }) => {
  const { token } = theme.useToken();

  const option = useMemo(() => {
    echarts.registerMap("china", { geoJSON: props.geoJson } as any);

    return {
      backgroundColor: "transparent",
      geo: {
        map: "china",
        label: {
          show: true,
          textStyle: {
            color: token.colorPrimary,
          },
        },
        itemStyle: {
          borderColors: "#5089EC",
          borderWidth: 1,
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 102, 154, 0)",
              },
              {
                offset: 1,
                color: token.colorPrimary,
              },
            ],
          },
        },

        emphasis: {
          label: {
            textStyle: {
              color: "#fff",
            },
          },
          itemStyle: {
            areaColor: token.colorPrimary || "#2386AD",
            borderWidth: 0,
          },
        },
      },
    };
  }, [token, props]);

  return <ReactEchart option={option} style={{ height: "700px" }} />;
};

export default ChinaMap;
