import { delay, of } from "rxjs";

const _months = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

const monthPartSaleData = [
  {
    name: "1",
    desc: "工专路 0 号店",
    count: "323,234",
  },
  {
    name: "2",
    desc: "工专路 1 号店",
    count: "323,234",
  },
  {
    name: "3",
    desc: "工专路 2 号店",
    count: "323,234",
  },
  {
    name: "4",
    desc: "工专路 3 号店",
    count: "323,234",
  },
  {
    name: "5",
    desc: "工专路 4 号店",
    count: "323,234",
  },
  {
    name: "6",
    desc: "工专路 5 号店",
    count: "323,234",
  },
  {
    name: "7",
    desc: "工专路 6 号店",
    count: "323,234",
  },
];

const salesData = {
  title: "总销售额",
  tip: "指标说明",
  unit: "￥",
  coreNum: "126,560",
  week: {
    num: "12%",
    status: "up",
  },
  day: {
    num: "11%",
    status: "down",
  },
  footer: {
    title: "日销售额",
    unit: "￥",
    price: "12,423",
  },
};

const visitCountData = {
  title: "访问量",
  tip: "指标说明",
  unit: "",
  coreNum: "6,560",
  footer: {
    title: "日访问量",
    unit: "",
    count: "1,423",
  },
  areaChartData: {
    xAxis: {
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    series: {
      data: [120, 132, 101, 134, 90, 230, 210],
    },
  },
};

const paymentData = {
  title: "支付笔数",
  tip: "指标说明",
  unit: "",
  coreNum: "560",
  footer: {
    title: "转换率",
    unit: "",
    precent: "60%",
  },
  barChartData: {
    xAxis: {
      data: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
      ],
    },
    series: {
      data: [2, 4, 6, 3, 5, 7, 1, 8, 2, 4, 6, 3, 5, 7],
    },
  },
};

const activeData = {
  title: "运营活动效果",
  tip: "指标说明",
  unit: "",
  coreNum: "78%",
  week: {
    num: "12%",
    status: "up",
  },
  day: {
    num: "11%",
    status: "down",
  },
  footer: {
    title: "日销售额",
    unit: "￥",
    price: "12,423",
  },
  bullet: {
    series: [
      {
        data: 18203,
      },
      {
        data: 6000,
      },
    ],
  },
};

const monthSales = {
  months: _months,
  data: [920, 830, 330, 380, 1100, 400, 490, 1000, 900, 600, 620, 570],
  part: monthPartSaleData,
};

const monthVisit = {
  months: _months,
  data: [450, 830, 730, 380, 1100, 500, 490, 1000, 900, 650, 720, 570],
  part: monthPartSaleData,
};

export const getAnalysisData = () => {
  return of({
    one: {
      salesData,
      visitCountData,
      paymentData,
      activeData,
    },
    two: {
      monthSales,
      monthVisit,
      monthPartSaleData,
    },
    three: {},
    four: {},
  }).pipe(delay(20));
};
