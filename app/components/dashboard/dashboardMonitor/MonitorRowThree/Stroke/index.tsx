// components:vendor
import { theme } from "antd";
import ReactChart from "echarts-for-react";

export default function Storke({ text, duration }: any) {
  const { token } = theme.useToken();
  const option = {
    graphic: {
      elements: [
        {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: text || "Remix",
            fontSize: 100,
            fontWeight: "bold",
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: "transparent",
            stroke: token.colorPrimary,
            lineWidth: 1,
          },
          keyframeAnimation: {
            duration: duration || 2000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: "transparent",
                  lineDashOffset: 200,
                  lineDash: [200, 0],
                },
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: "transparent",
                },
              },
              {
                percent: 1,
                style: {
                  fill: token.colorPrimary,
                },
              },
            ],
          },
        },
      ],
    },
  };
  return (
    <>
      <ReactChart option={option} />
    </>
  );
}
