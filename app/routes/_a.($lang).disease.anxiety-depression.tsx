import { PageContainer } from "@ant-design/pro-components";
import { Card, List } from "antd";

const data = [
  {
    title: "1. 工作压力：",
    content:
      "程序员常常面临高强度的工作压力，包括项目期限、需求变更和技术挑战等。长期承受工作压力可能导致焦虑和抑郁情绪。",
  },
  {
    title: "2. 社交隔离：",
    content:
      "长时间专注于电脑工作，缺乏社交互动和人际关系，可能导致孤独感和社交隔离，进而影响心理健康。",
  },
  {
    title: "3. 长时间的静坐：",
    content:
      "程序员的工作往往需要长时间坐在同一个位置，缺乏身体活动。这种久坐行为与焦虑和抑郁的发病率增加有关。",
  },
  {
    title: "4. 失眠和睡眠问题：",
    content:
      "工作压力和长时间使用电子设备可能导致睡眠质量下降，引发失眠和睡眠问题。缺乏良好的睡眠可能加剧焦虑和抑郁症状。",
  },
  {
    title: "5. 技术依赖和沉迷：",
    content:
      "过度依赖和沉迷于技术设备和互联网可能导致社交隔离、情绪波动和心理依赖，增加焦虑和抑郁的风险。",
  },
];

const op_data = [
  {
    content: "寻求支持：与家人、朋友或同事分享感受，获得情感支持和理解。",
  },
  {
    content:
      "保持工作与生活的平衡：合理分配时间，包括工作、休息和娱乐活动，为自己创造平衡的生活。",
  },
  {
    content:
      "建立社交联系：参加社交活动、加入兴趣小组或参与团队项目，增加社交互动，减轻社交隔离感。",
  },
  {
    content:
      "锻炼身体：定期参加身体活动，如散步、跑步或其他运动，增加身体活动量，改善心理健康。",
  },
  {
    content: "学习应对技巧：学习应对焦虑和抑郁的技巧，如放松训练、冥想和深呼吸练习，以减轻压力和焦虑情绪。",
  },
  {
    content:
      "规律作息：建立健康的睡眠习惯，确保足够的睡眠时间和质量，有助于改善心理状态。",
  },
  {
    content:
      "寻求专业帮助：如果焦虑和抑郁症状严重影响生活和工作，建议咨询心理健康专业人士，如心理咨询师或精神健康医生",
  },
];

const HealthRoute: React.FC = () => {
  return (
    <PageContainer title={false}>
      <h3>
        作为程序员，长时间进行电脑工作和工作压力可能导致一些与焦虑和抑郁相关的常见问题。以下是一些常见的与焦虑和抑郁相关的问题：
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
      <h3>为了应对焦虑和抑郁相关的问题，程序员可以尝试以下策略：</h3>
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

export default HealthRoute;
