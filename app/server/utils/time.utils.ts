const getTodayTime = () => {
  const today = new Date();

  // 设置时间为今天的 00:00:00
  const startTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
  );

  // 设置时间为今天的 23:59:59
  const endTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
  );

  return { startTime, endTime };
};

export { getTodayTime };
