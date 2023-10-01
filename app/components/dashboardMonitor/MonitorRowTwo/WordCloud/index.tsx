// components:vendor
import ReactWordcloud from "react-wordcloud";

const words = [
  {
    text: "刘备",
    value: 2814,
  },
  {
    text: "曹操",
    value: 2300,
  },
  {
    text: "诸葛亮",
    value: 2107,
  },
  {
    text: "关羽",
    value: 1341,
  },
  {
    text: "吕布",
    value: 764,
  },
  {
    text: "孙权",
    value: 681,
  },
  {
    text: "赵云",
    value: 644,
  },
  {
    text: "司马懿",
    value: 635,
  },
  {
    text: "张飞",
    value: 631,
  },
  {
    text: "周瑜",
    value: 630,
  },
  {
    text: "姜维",
    value: 607,
  },
  {
    text: "袁绍",
    value: 535,
  },
  {
    text: "魏延",
    value: 434,
  },
  {
    text: "马超",
    value: 371,
  },
  {
    text: "鲁肃",
    value: 336,
  },
  {
    text: "邓艾",
    value: 325,
  },
  {
    text: "张郃",
    value: 304,
  },
  {
    text: "董卓",
    value: 304,
  },
  {
    text: "刘禅",
    value: 281,
  },
  {
    text: "黄忠",
    value: 277,
  },
  {
    text: "刘表",
    value: 241,
  },
  {
    text: "张辽",
    value: 230,
  },
  {
    text: "司马昭",
    value: 222,
  },
  {
    text: "庞德",
    value: 195,
  },
  {
    text: "曹仁",
    value: 189,
  },
  {
    text: "曹真",
    value: 188,
  },
  {
    text: "徐晃",
    value: 186,
  },
  {
    text: "曹丕",
    value: 182,
  },
  {
    text: "吕蒙",
    value: 180,
  },
  {
    text: "陆逊",
    value: 180,
  },
  {
    text: "袁术",
    value: 169,
  },
  {
    text: "夏侯惇",
    value: 164,
  },
  {
    text: "许褚",
    value: 164,
  },
  {
    text: "庞统",
    value: 163,
  },
  {
    text: "甘宁",
    value: 156,
  },
  {
    text: "孙坚",
    value: 144,
  },
  {
    text: "夏侯渊",
    value: 141,
  },
  {
    text: "刘璋",
    value: 137,
  },
  {
    text: "曹洪",
    value: 131,
  },
  {
    text: "于禁",
    value: 128,
  },
  {
    text: "王平",
    value: 126,
  },
  {
    text: "黄盖",
    value: 125,
  },
  {
    text: "孙乾",
    value: 123,
  },
  {
    text: "郭淮",
    value: 119,
  },
  {
    text: "司马师",
    value: 114,
  },
  {
    text: "太史慈",
    value: 109,
  },
  {
    text: "廖化",
    value: 105,
  },
  {
    text: "张昭",
    value: 105,
  },
  {
    text: "李典",
    value: 103,
  },
  {
    text: "张鲁",
    value: 103,
  },
  {
    text: "公孙瓒",
    value: 102,
  },
  {
    text: "贾诩",
    value: 101,
  },
  {
    text: "曹叡",
    value: 96,
  },
  {
    text: "张翼",
    value: 95,
  },
];

export default function SimpleWordcloud() {
  const options: any = {
    colors: [
      "#a5d6a7",
      "#66bb6a",
      "#43a047",
      "#7cb342",
      "#388e3c",
      "#2e7d32",
      "#1b5e20",
    ],
    enableTooltip: true,
    deterministic: true,
    fontFamily: "impact",
    fontSizes: [12, 40],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [-90, 0, 90],
    scale: "sqrt",
    spiral: "rectangular",
    transitionDuration: 1000,
  };
  return <ReactWordcloud words={words} options={options} />;
}
