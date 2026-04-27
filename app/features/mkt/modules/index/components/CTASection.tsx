import { Card, Typography, Button, Space, Avatar } from "antd";
import { RocketOutlined, BookOutlined, CheckCircleFilled } from "@ant-design/icons";
import { PRODUCT_NAME } from "~/config/product";
import styles from "./CTASection.module.css";

const { Title, Paragraph } = Typography;

const trustBadges = [
  { text: "MIT 开源协议" },
  { text: "生产级代码" },
  { text: "活跃维护" },
  { text: "中文文档" },
];

const testimonials = [
  { name: "张", avatar: "/images/user.jpg" },
  { name: "李", avatar: "/images/user.jpg" },
  { name: "王", avatar: "/images/user.jpg" },
];

export function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Card
          className={styles.card}
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          }}
          styles={{ body: { padding: "64px 24px" } }}
        >
          {/* 背景装饰 */}
          <div className={styles.bgDecoration1} />
          <div className={styles.bgDecoration2} />

          {/* 网格装饰 */}
          <div className={styles.gridOverlay} />

          <div className={styles.content}>
            {/* 顶部标签 */}
            <div className={styles.badge}>
              <CheckCircleFilled className={styles.badgeIcon} />
              已帮助 8,500+ 开发者快速启动项目
            </div>

            <Title level={2} className={styles.title}>
              立即开始你的项目
            </Title>
            <Paragraph className={styles.desc}>
              使用 {PRODUCT_NAME}，快速构建现代化的全栈应用
            </Paragraph>

            {/* CTA 按钮 */}
            <div className={styles.ctaContainer}>
              <Space size="large" wrap>
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  href="https://github.com/yyong008/remix-antd-admin"
                  target="_blank"
                  className={styles.ctaPrimary}
                >
                  开始使用
                </Button>
                <Button
                  size="large"
                  icon={<BookOutlined />}
                  href="https://remix-antd-admin-docs.vercel.app/"
                  target="_blank"
                  className={styles.ctaSecondary}
                >
                  查看文档
                </Button>
              </Space>
            </div>

            {/* 信任标志 */}
            <div className={styles.trust}>
              {/* 用户头像堆叠 */}
              <div className={styles.userAvatars}>
                <div className={styles.avatarStack}>
                  {testimonials.map((t, i) => (
                    <Avatar key={i} src={t.avatar} size={32} className={styles.avatar} />
                  ))}
                </div>
                <span className={styles.trustText}>50+ 贡献者</span>
              </div>

              <div className={styles.divider} />

              {/* 徽章列表 */}
              {trustBadges.map((badge, i) => (
                <div key={i} className={styles.badgeList}>
                  <CheckCircleFilled className={styles.badgeIconSmall} />
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
