// core
import { useMemo } from "react";

// components
import { theme } from "antd";
import ReactEchart from 'echarts-for-react'

// utils
import * as echarts from "echarts";

const ChinaMap = () => {
  const { token } = theme.useToken();

  const option = useMemo(() => {
    
    let geoJson =  require('~/data/100000.geoJson.json')
    // @ts-ignore
    echarts.registerMap("china", { geoJSON: geoJson });

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
    }
  }, [token])

  return <ReactEchart option={option} style={{ height: "700px" }} />
}

export default ChinaMap
