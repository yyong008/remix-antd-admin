
// 获取当前的年月日 -> 当前月份的第一天是星期几?
import { gnDateFn, Temporal } from "../utils";

const { year, month } = gnDateFn();

// 本月第一天
let d = Temporal.ZonedDateTime.from(
  { timeZone: "Asia/Shanghai", year, month: month, day: 1 },
  { overflow: "constrain" }
);

// 本月最后一天
let dl = Temporal.ZonedDateTime.from(
  { timeZone: "Asia/Shanghai", year, month: month, day: 31 },
  { overflow: "constrain" }
);

const wk = [
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '日'
]

// d.dayOfWeek
const line = new Array(7).fill(0).map((_, i) => {
  if (i + 1 < d.dayOfWeek) {
    return 0;
  } else {
    return i + 2 - d.dayOfWeek;
  }
});

const line2 = new Array(7).fill(0).map((_, i) => {
  if (line[6] + i + 1 > dl.day) {
    return 0;
  } else {
    return i + 1 + line[6]
  }
});

const line3 = new Array(7).fill(0).map((_, i) => {
  if (line2[6] + i + 1 > dl.day) {
    return 0;
  } else {
    return i + 1 + line2[6]
  }
});

const line4 = new Array(7).fill(0).map((_, i) => {
  if (line3[6] > dl.day) {
    return 0;
  } else {
    return i + 1 + line3[6]
  }
});

const line5 = new Array(7).fill(0).map((_, i) => {
  if (line4[6] + i + 1 > dl.day) {
    return 0;
  } else {
    return i + 1 + line4[6]
  }
});

const line6 = new Array(7).fill(0).map((_, i) => {
  if ( line5[6] === 0 || line5[6] + i + 1 > dl.day) {
    return 0;
  } else {
    return i + 1 + line5[6]
  }
});

export const week = [
  wk,
  line,
  line2,
  line3,
  line4,
  line5,
  line6
]