type DebugConfig = {
  isDebug: 0 | 1;
};

export const debugConfig: DebugConfig = {
  isDebug: !!process.env.isDeg || 1, // 关闭
};
