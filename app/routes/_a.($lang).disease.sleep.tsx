import { PageContainer } from "@ant-design/pro-components";
import { Card, List } from "antd";

const data = [
  {
    title: "1. 失眠：",
    content:
      "长时间使用电子设备、工作压力和焦虑等因素可能导致失眠，即难以入睡或保持良好的睡眠质量。",
  },
  {
    title: "2. 睡眠不足：",
    content:
      "长时间工作导致的熬夜、过度疲劳和不规律的作息时间可能导致睡眠不足。不足的睡眠会影响身体的修复和恢复，可能导致身体和心理健康问题。",
  },
  {
    title: "3. 睡眠质量下降：",
    content:
      "长时间面对电子屏幕、工作压力和焦虑可能导致睡眠质量下降。即使睡眠时间足够，质量低下的睡眠也不能充分恢复身体和大脑功能。",
  },
  {
    title: "4. 睡眠呼吸障碍：",
    content:
      "长时间久坐和缺乏身体活动可能增加患上睡眠呼吸障碍的风险，如阻塞性睡眠呼吸暂停和打鼾。",
  },
  {
    title: "5. 倒时差问题：",
    content:
      "长时间在不规律的作息时间下工作可能导致生物钟紊乱，引起倒时差问题。这会导致入睡困难、早醒和白天疲劳。",
  },
];

const op_data = [
  {
    content: "养成良好的睡眠习惯：建立规律的作息时间，尽量在相同的时间上床睡觉和起床，保持稳定的睡眠时间。",
  },
  {
    content:
      "睡前放松：在睡前放松身心，可以尝试冥想、深呼吸、放松音乐或温水浸泡等方式。",
  },
  {
    content:
      "创造舒适的睡眠环境：保持安静、暗度和适宜的温度，使用舒适的床垫和枕头，确保睡眠环境的舒适性。",
  },
  {
    content:
      "避免刺激物和电子设备：避免在睡前饮用咖啡因和刺激性饮料，减少电子设备使用时间，尤其是睡前一小时。",
  },
  {
    content: "定期进行身体活动：加强身体活动，如有氧运动和力量训练，有助于提高睡眠质量。",
  },
  {
    content:
      "减轻工作压力：寻找减压方法，如分解任务、合理规划时间和寻求支持，以减轻工作压力对睡眠的影响。",
  },
  {
    content:
      "建立日常的放松和睡前习惯：创建适合自己的睡前放松活动，如阅读、沐浴或放松瑜伽，帮助身心放松，为睡眠做好准备。",
  },
];

const HealthSleepRoute: React.FC = () => {
  return (
    <PageContainer title={false}>
      <h3>
        作为程序员，长时间进行电脑工作和缺乏身体活动可能导致一些与睡眠相关的常见问题。以下是一些与睡眠相关的常见问题：
      </h3>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title} style={{ minHeight: "200px" }}>
              {item.content}
            </Card>
          </List.Item>
        )}
      />
      <h3>为了改善睡眠质量和预防睡眠相关问题，程序员可以尝试以下策略：</h3>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={op_data}
        renderItem={(item) => (
          <List.Item>
            <Card title={false} style={{ minHeight: "130px" }}>{item.content}</Card>
          </List.Item>
        )}
      />
    </PageContainer>
  );
};

export default HealthSleepRoute;
