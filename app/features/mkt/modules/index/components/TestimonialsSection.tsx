import { Row, Col, Card, Typography, Avatar } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        padding: "60px 24px 100px",
        background: "linear-gradient(180deg, transparent 0%, var(--mkt-bg) 50%, transparent 100%)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Title level={2} style={{ marginBottom: "12px" }}>
            用户评价
          </Title>
          <Paragraph type="secondary" style={{ maxWidth: "600px", margin: "0 auto" }}>
            来自开发者社区的真实反馈
          </Paragraph>
        </div>

        {/* 评价卡片 */}
        <div
          style={{
            position: "relative",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Card
            style={{
              borderRadius: "20px",
              border: "1px solid var(--mkt-border)",
              boxShadow: "0 24px 48px var(--mkt-shadow)",
              overflow: "hidden",
            }}
            bodyStyle={{ padding: "48px" }}
          >
            {/* 引用图标 */}
            <div
              style={{
                position: "absolute",
                top: "24px",
                right: "32px",
                fontSize: "48px",
                color: "var(--mkt-border)",
                opacity: 0.3,
                fontFamily: "Georgia, serif",
              }}
            >
              "
            </div>

            {/* 评分 */}
            <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
              {[...Array(5)].map((_, i) => (
                <StarOutlined
                  key={i}
                  style={{
                    color: i < testimonials[activeIndex].rating ? "#FFD700" : "var(--mkt-border)",
                    fontSize: "18px",
                  }}
                />
              ))}
            </div>

            {/* 评价内容 */}
            <Paragraph
              style={{
                fontSize: "18px",
                lineHeight: 1.8,
                color: "var(--mkt-text)",
                marginBottom: "32px",
                fontStyle: "italic",
                minHeight: "80px",
                transition: "all 0.4s ease",
              }}
            >
              "{testimonials[activeIndex].content}"
            </Paragraph>

            {/* 用户信息 */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar
                src={testimonials[activeIndex].avatar}
                size={56}
                style={{
                  border: "2px solid var(--mkt-border)",
                }}
              />
              <div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--mkt-text)" }}>
                  {testimonials[activeIndex].name}
                </div>
                <div style={{ fontSize: "13px", color: "var(--mkt-muted)" }}>
                  {testimonials[activeIndex].role}
                </div>
              </div>
            </div>
          </Card>

          {/* 切换指示器 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginTop: "24px",
            }}
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                style={{
                  width: index === activeIndex ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  background:
                    index === activeIndex
                      ? "linear-gradient(135deg, var(--mkt-accent) 0%, var(--mkt-accent-2) 100%)"
                      : "var(--mkt-border)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
