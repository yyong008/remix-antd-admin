// core
import { useEffect, useRef } from "react";

// components
import { theme } from "antd";

// utils
import * as echarts from "echarts";

// data
import geoJson from "~/data/100000.geoJson.json";

// @ts-ignore
echarts.registerMap("china", { geoJSON: geoJson });

export default function ChinaMap() {
  const { token } = theme.useToken();

  const ref = useRef(null);
  let mapInstance: any = null;

  const renderChart = () => {
    mapInstance = echarts.init(ref.current!);

    mapInstance.setOption({
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
    });
  };

  useEffect(() => {
    renderChart();

    const handle = () => {
      mapInstance?.resize();
    };
    window.addEventListener("resize", handle);

    return () => {
      window.addEventListener("resize", handle);
    };
  }, [token]);

  return <div style={{ height: "700px" }} ref={ref}></div>;
}
