import { PageContainer } from "@ant-design/pro-components";
import { Card, List } from "antd";

const data = [
  {
    title: "1. 颈部疼痛：",
    content:
      "长时间保持固定的头部和颈部姿势，例如低头盯着屏幕，可能导致颈部肌肉的过度紧张和疼痛。这被称为颈部肌肉劳损或颈部痛。",
  },
  {
    title: "2. 颈椎间盘突出：",
    content:
      "长时间保持不良的坐姿和颈部姿势，加上重复性的头部运动，可能导致颈椎间盘受压，出现脊椎间盘突出。这可能引起颈部疼痛、放射性疼痛和神经症状。",
  },
  {
    title: "3. 颈椎退行性疾病：",
    content:
      "随着年龄的增长，颈椎可能出现退行性变化，如骨质增生、椎间盘退变和关节炎。这些变化可能导致颈椎疼痛、颈部僵硬和运动受限。",
  },
  {
    title: "4. 脊椎不稳定：",
    content:
      "长时间保持不良的坐姿和缺乏适当的脊椎支撑可能导致脊椎不稳定。这可能增加颈椎受伤的风险，并导致颈部疼痛和运动受限。",
  },
];

const op_data = [
  {
    content: "保持良好的坐姿：坐直身体，使颈椎和脊椎处于自然的对齐位置。",
  },
  {
    content:
      "经常休息和伸展：定期休息并进行颈部、肩部和背部的伸展运动，有助于缓解紧张和疲劳。",
  },
  {
    content:
      "调整工作环境：确保工作台和椅子符合人体工程学，提供适当的脊柱支撑和颈部支撑。",
  },
  {
    content:
      "使用合适的显示器高度：将显示器设置在与眼睛平齐的高度，以减少低头和颈部屈曲。",
  },
  {
    content: "定期锻炼：加强颈部和背部的肌肉，保持身体的稳定性和力量。",
  },
  {
    content:
      "寻求医疗建议：如果出现持续的颈部疼痛或严重不适，建议咨询医生或专业的康复治疗师。",
  },
];

const HealthRoute: React.FC = () => {
  return (
    <PageContainer title={false}>
      <h3>
        作为程序员，长时间坐在电脑前工作和专注于屏幕可能对颈椎和脊椎产生一定的压力和负担，导致一系列问题。以下是一些常见的与颈椎和脊椎相关的问题：
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
      <h3>为了缓解和预防颈椎和脊椎问题，程序员可以采取以下措施：</h3>
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

export default HealthRoute;
