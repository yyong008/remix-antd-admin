import { PageContainer } from "@ant-design/pro-components";
import { Card, List } from "antd";

const data = [
  {
    title: "1. 腕隧道综合征：",
    content:
      "腕隧道是位于手腕内侧的通道，其中通过的腱和神经可能受到压迫。长时间重复性的手腕活动，如键盘操作，可能导致腕隧道综合征。症状包括手腕疼痛、手指麻木、手指力量减弱和灼热感。",
  },
  {
    title: "2. 鼠标手：",
    content:
      "频繁使用鼠标并保持手部在不自然的姿势下可能导致鼠标手。这会引起手腕疼痛、手指麻木、手部肌肉疲劳和僵硬感。",
  },
  {
    title: "3. 肩颈手综合征：",
    content:
      "长时间保持不良的姿势和手部动作可能导致肩部、颈部和手部的紧张和不适，称为肩颈手综合征。症状包括手腕和手指疼痛、颈部和肩部僵硬、放射性疼痛和肌肉疲劳。",
  },
  {
    title: "4. 肌肉劳损：",
    content:
      "长时间连续使用手部和手指可能导致手部肌肉的劳损。这可能表现为手部疼痛、肌肉酸痛和疲劳感。",
  },
];

const op_data = [
  {
    content:
      "保持良好的手部姿势：保持手腕和手指自然放松、轻柔地弯曲，避免过度伸展或弯曲手腕。",
  },
  {
    content:
      "使用人体工程学设备：选择符合人体工程学设计的键盘和鼠标，以减少手部和手腕的压力和不适。",
  },
  {
    content:
      "经常休息和伸展：每隔一段时间，进行手部和手腕的伸展运动，放松紧张的肌肉，缓解疲劳感。",
  },
  {
    content:
      "使用合适的键盘和鼠标姿势：调整键盘和鼠标的高度和位置，使手腕处于自然放松的状态。",
  },
  {
    content:
      "使用软垫和支撑：在键盘前放置软垫或手腕支撑，以减轻手部和手腕的压力。",
  },
  {
    content: "定期进行体育锻炼：加强手部和手腕的肌肉力量，提高灵活性和稳定性。",
  },
  {
    content:
      "寻求医疗建议：如果出现持续的手部疼痛或严重不适，建议咨询医生或专业的康复治疗师进行评估和治疗。",
  },
];

const HealthHandRoute: React.FC = () => {
  return (
    <PageContainer title={false}>
      <h3>
        作为程序员，长时间使用键盘和鼠标进行电脑工作可能导致手部和手腕的问题。以下是一些与手部和手腕相关的常见问题：
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
      <h3>为了缓解和预防手部和手腕问题，程序员可以采取以下措施：</h3>
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
            <Card title={false} style={{ minHeight: "130px" }}>
              {item.content}
            </Card>
          </List.Item>
        )}
      />
    </PageContainer>
  );
};

export default HealthHandRoute;
