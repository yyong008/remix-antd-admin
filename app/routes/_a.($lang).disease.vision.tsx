import { PageContainer } from "@ant-design/pro-components";
import { Card, List } from "antd";

const data = [
  {
    title: "1. 计算机视觉综合征（CVS）:",
    content:
      "长时间盯着屏幕工作可能导致视疲劳和不适感，称为计算机视觉综合征。症状包括眼睛疲劳、眼干涩、眼痛、模糊视觉和头痛。",
  },
  {
    title: "2. 近视（近视眼）:",
    content:
      "长时间近距离注视屏幕，眼睛对远处对象的调节能力减弱，容易导致近视。近视会使远处的物体变得模糊不清。",
  },
  {
    title: "3. 散光（斜视）:",
    content:
      "散光是眼睛无法正确聚焦光线，导致物体看起来模糊。长时间注视屏幕可能使散光问题更加明显。",
  },
  {
    title: "4. 干眼症：",
    content:
      "长时间盯着屏幕，会导致眨眼次数减少，引发眼睛干涩、疼痛、痒和疲劳，这被称为干眼症。",
  },
];

const op_data = [
  {
    content:
      "保持良好的用眼习惯：每隔一段时间，将目光从屏幕上抬起，远离视觉焦点，眺望远处，给眼睛休息的机会",
  },
  {
    content:
      "实施20-20-20法则：每隔20分钟，将目光从屏幕上移开，注视远处的物体或景色至少20秒钟。这有助于缓解视疲劳。",
  },
  {
    content:
      "保持适当的工作距离：将显示器放置在距离眼睛约20-30英寸（50-75厘米）的位置，避免过近或过远的距离。",
  },
  {
    content:
      "调整屏幕亮度和对比度：确保屏幕的亮度与周围环境相匹配，并调整对比度以获得舒适的视觉体验。",
  },
  {
    content:
      "使用护眼滤光镜：考虑在显示器上使用护眼滤光镜，减少对眼睛的蓝光暴露。",
  },
  {
    content:
      "保持良好的室内照明：确保工作环境光线充足，避免过暗或过亮的照明环境。",
  },
  {
    content:
      "定期进行眼睛检查：定期接受眼睛检查，以确保及时发现和处理任何视力问题。",
  },
];

const HealthVisionRoute: React.FC = () => {
  return (
    <PageContainer title={false}>
      <h3>
        作为程序员，长时间注视计算机屏幕可能会对视力造成一定的压力和影响。以下是一些与视力相关的常见问题：
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
      <h3>为了保护视力和预防视力问题，程序员可以采取以下措施：</h3>
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

export default HealthVisionRoute;
