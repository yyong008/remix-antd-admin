import { PageContainer } from "@ant-design/pro-components";
import { Card, List } from "antd";

const data = [
  {
    title: "1. 肌肉萎缩：",
    content:
      "长时间久坐和缺乏身体活动会导致肌肉的萎缩和减弱，特别是核心肌群和背部肌肉。这可能导致姿势不良和身体的不平衡。",
  },
  {
    title: "2. 体力下降：",
    content:
      "缺乏身体运动和有氧活动会导致体力水平下降。程序员长时间久坐，缺乏足够的身体运动，可能感到体力不支和易疲劳。",
  },
  {
    title: "3. 心血管健康问题：",
    content:
      "缺乏身体活动会增加心血管疾病的风险。长期缺乏有氧运动可能导致心血管健康问题，如高血压、心脏病和中风等。",
  },
  {
    title: "4. 代谢问题：",
    content:
      "长时间久坐和缺乏身体活动可能导致代谢率下降。代谢率下降可能导致体重增加、脂肪积累和代谢紊乱。",
  },
  {
    title: "5. 骨质疏松：",
    content:
      "缺乏体重负荷的运动，如重力训练和有氧运动，可能导致骨质疏松和骨密度下降。",
  },
];

const op_data = [
  {
    content:
      "增加身体活动：尽量每天安排一定时间进行身体活动，如散步、慢跑、游泳或参加健身课程。也可以尝试使用站立式办公桌或定期休息来活动身体。",
  },
  {
    content:
      "定期进行有氧运动：有氧运动对心血管健康和代谢非常有益。尝试每周进行至少150分钟的中等强度有氧运动，如快走、跑步、骑自行车或跳舞。",
  },
  {
    content:
      "强化核心肌群：通过针对核心肌群的练习，如平板支撑、腹肌训练和背部伸展，来改善姿势和减轻肌肉不平衡问题。",
  },
  {
    content:
      "均衡饮食：保持均衡的饮食，摄入足够的营养素，包括蛋白质、维生素和矿物质，以支持身体的健康和能量。",
  },
  {
    content:
      "设立目标和规划：制定合理的运动目标，并制定计划和时间表来确保每天获得足够的身体活动。",
  },
];

const HealthRoute: React.FC = () => {
  return (
    <PageContainer title={false}>
      <h3>
        作为程序员，长时间进行电脑工作和缺乏身体活动可能导致一些与缺乏运动和体能下降相关的常见问题。以下是一些与缺乏运动和体能下降相关的常见问题：
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
      <h3>为了应对缺乏运动和体能下降的问题，程序员可以尝试以下策略：</h3>
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
