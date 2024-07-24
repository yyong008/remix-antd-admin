export const getGB = (val: number = 0) => {
  return val ? (val / 1024 / 1024 / 1024).toFixed(1) : "0";
};

export const getPercent = (val: number = 0) => {
  return val ? (val * 100).toFixed(2) + "%" : "0%";
};
