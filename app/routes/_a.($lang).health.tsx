import { PageContainer } from "@ant-design/pro-components";
import { Link, useLocation } from "@remix-run/react";
import { Card, List } from "antd";
import ReactEcharts from "~/components/healthDisable/DiseaseBarChart";

const data = [
  {
    path: "/disease/cervical-vertebra",
    title: "1. 颈椎和脊椎问题：",
    content:
      "长时间坐在同一位置、不正确的姿势和缺乏适当的脊柱支撑可能导致颈椎和脊椎的压力和紧张，引发颈部和背部疼痛、僵硬和不适。",
  },
  {
    path: "/disease/vision",
    title: "2. 视力问题：",
    content:
      "长时间注视计算机屏幕可能导致眼睛疲劳、干涩和眼部不适，甚至引发近视。这被称为计算机视觉综合征（CVS）或数字眼疲劳。",
  },
  {
    path: "/disease/hand",
    title: "3. 手部和手腕问题：",
    content:
      "频繁的键盘和鼠标使用可能导致手部和手腕的疲劳、疼痛和不适，如腕隧道综合征和鼠标手。",
  },
  {
    path: "/disease/obesity",
    title: "4. 肥胖和缺乏锻炼：",
    content:
      "长时间坐在桌前可能导致缺乏运动，加上不良的饮食习惯，容易导致肥胖和相关的健康问题，如心血管疾病和代谢综合征。",
  },
  {
    path: "/disease/anxiety-depression",
    title: "5. 焦虑和抑郁：",
    content:
      "高强度的工作压力、长时间的屏幕工作和社交隔离可能增加焦虑和抑郁的风险。",
  },
  {
    path: "/disease/sleep",
    title: "T6. 缺乏睡眠：",
    content:
      "工作紧张、加班和熬夜可能导致睡眠不足和睡眠质量下降，进而影响身体和心理健康。",
  },
  {
    path: "/disease/sport",
    title: "7. 缺乏运动和体能下降：",
    content: "长时间坐着工作会导致缺乏运动，肌肉力量下降和体能不佳。",
  },
];

const HealthRoute: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <PageContainer title={false}>
      <h3>
        作为程序员，长时间进行电脑工作和专注于屏幕可能导致一些与工作环境相关的疾病和健康问题。以下是一些程序员容易遇到的常见疾病和健康问题：
      </h3>
      <ReactEcharts />
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
          <Link to={pathname.split("/")[0] + "/" + item.path?.slice(1)}>
            <List.Item>
              <Card title={item.title}>{item.content}</Card>
            </List.Item>
          </Link>
        )}
      />
      <div>
        为了预防这些问题，程序员可以采取以下措施：定期休息和眼部放松、保持良好的姿势和脊柱支撑、进行适度的体育锻炼、保持适当的饮食、减少工作压力、定期眼部检查，并遵循良好的睡眠习惯。此外，经常进行眼部锻炼、保持屏幕适当的亮度和对比度、使用蓝光滤光镜以及使用人体工学键盘和
      </div>
    </PageContainer>
  );
};

export default HealthRoute;
