import { useState } from "react";
import { Card, Typography, Avatar } from "antd";
import { StarOutlined } from "@ant-design/icons";
import styles from "./TestimonialsSection.module.css";

const { Title, Paragraph } = Typography;

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "张三",
    role: "全栈工程师 @ 某科技公司",
    avatar: "/images/user.jpg",
    content:
      "这是我用过的最好的 React Router 模板。配置简单，文档清晰，让我在一周内就上线了 AI 管理后台。强烈推荐！",
    rating: 5,
  },
  {
    name: "李四",
    role: "技术负责人 @ 创业公司",
    avatar: "/images/user.jpg",
    content:
      "团队从 Remix 迁移到 React Router v7，体验非常顺畅。Hono 的集成让 API 开发变得轻松愉快。",
    rating: 5,
  },
  {
    name: "王五",
    role: "独立开发者",
    avatar: "/images/user.jpg",
    content:
      "开箱即用的 AI 集成和漂亮的 UI 组件库，省去了大量重复工作。唯一缺点是官方文档还能再详细点。",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            用户评价
          </Title>
          <Paragraph className={styles.desc}>来自开发者社区的真实反馈</Paragraph>
        </div>

        {/* 评价卡片 */}
        <div className={styles.cardWrapper}>
          <Card className={styles.card} styles={{ body: { padding: "48px" } }}>
            {/* 引用图标 */}
            <div className={styles.quoteIcon}>"</div>

            {/* 评分 */}
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <StarOutlined
                  key={i}
                  className={`${styles.star} ${i < testimonials[activeIndex].rating ? styles.starFilled : styles.starEmpty}`}
                />
              ))}
            </div>

            {/* 评价内容 */}
            <Paragraph className={styles.content}>"{testimonials[activeIndex].content}"</Paragraph>

            {/* 用户信息 */}
            <div className={styles.user}>
              <Avatar
                src={testimonials[activeIndex].avatar}
                size={56}
                className={styles.userAvatar}
              />
              <div>
                <div className={styles.userName}>{testimonials[activeIndex].name}</div>
                <div className={styles.userRole}>{testimonials[activeIndex].role}</div>
              </div>
            </div>
          </Card>

          {/* 切换指示器 */}
          <div className={styles.indicators}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`${styles.indicator} ${index === activeIndex ? styles.indicatorActive : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
