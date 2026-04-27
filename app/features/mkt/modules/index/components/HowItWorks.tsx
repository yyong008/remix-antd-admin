import { Col, Card, Typography } from "antd";
import { CloudUploadOutlined, SettingOutlined, RocketOutlined } from "@ant-design/icons";
import styles from "./HowItWorks.module.css";

const { Title, Paragraph } = Typography;

const steps = [
  {
    icon: <CloudUploadOutlined />,
    title: "克隆项目模板",
    description: "使用 Git 克隆或使用 CLI 工具创建新项目",
    color: "#6366f1",
  },
  {
    icon: <SettingOutlined />,
    title: "配置环境变量",
    description: "复制 .env.example 并配置必要的 API 密钥和数据库连接",
    color: "#8b5cf6",
  },
  {
    icon: <RocketOutlined />,
    title: "启动开发服务器",
    description: "运行 pnpm dev 开始开发，访问 http://localhost:5173",
    color: "#6366f1",
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            快速上手
          </Title>
          <Paragraph className={styles.desc}>三步启动你的下一个全栈项目</Paragraph>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <div className={styles.step}>
                <Card
                  className={styles.card}
                  styles={{ body: { padding: "32px", textAlign: "center" } }}
                >
                  <div
                    className={styles.stepNumber}
                    style={{
                      background: `linear-gradient(135deg, ${step.color} 0%, color-mix(in srgb, ${step.color} 70%, transparent) 100%)`,
                    }}
                  >
                    {index + 1}
                  </div>

                  <div
                    className={styles.stepIcon}
                    style={{
                      background: `color-mix(in srgb, ${step.color} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${step.color} 30%, transparent)`,
                      color: step.color,
                    }}
                  >
                    {step.icon}
                  </div>

                  <Title level={4} className={styles.stepTitle}>
                    {step.title}
                  </Title>
                  <Paragraph className={styles.stepDesc}>{step.description}</Paragraph>
                </Card>
              </div>
            </Col>
          ))}
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeCommand}># 克隆项目</div>
          <div className={styles.codeValue}>
            git clone https://github.com/yyong008/remix-antd-admin.git
          </div>
          <div className={styles.codeCommand}># 安装依赖</div>
          <div className={styles.codeValue}>pnpm install</div>
          <div className={styles.codeCommand}># 启动开发</div>
          <div className={styles.codeValue}>pnpm dev</div>
        </div>
      </div>
    </section>
  );
}
