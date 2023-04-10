const dataSource: any[] = [];

for (let i = 0; i < 50; i++) {
  dataSource.unshift({
    id: i,
    title: "丽萨" + i,
    avatar: "/images/user.jpg",
    content: [
      {
        label: "Owner",
        value: 2903 + i,
      },
      {
        label: "开始时间",
        value: new Date().toLocaleString(),
      },
      {
        label: "进度",
        value: i,
      },
    ],
  });
}

export default {
  dataSource,
};
