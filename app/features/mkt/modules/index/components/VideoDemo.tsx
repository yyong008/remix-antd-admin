import { Row, Col, Card, Typography, Button } from "antd";
import { PlayCircleOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph } = Typography;

export function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section style={{ padding: "60px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Title level={2} style={{ marginBottom: "12px" }}>
            看看它是如何工作的
          </Title>
          <Paragraph type="secondary" style={{ maxWidth: "600px", margin: "0 auto" }}>
            快速了解如何使用 React Router Antd Admin 构建现代化的全栈应用
          </Paragraph>
        </div>

        {/* 视频预览区 */}
        <div
          style={{
            position: "relative",
            maxWidth: "900px",
            margin: "0 auto",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0, 0, 0, 0.15), 0 0 0 1px var(--mkt-border)",
          }}
        >
          {/* 视频封面 / 缩略图 */}
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              cursor: "pointer",
            }}
            onClick={() => setIsPlaying(true)}
          >
            {/* 背景装饰 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 50%, rgba(118, 75, 162, 0.3) 0%, transparent 50%)
                `,
              }}
            />

            {/* UI 元素装饰 */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                right: "20px",
                display: "flex",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#ff5f57",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#ffbd2e",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#28ca42",
                }}
              />
            </div>

            {/* 代码预览装饰 */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                maxWidth: "600px",
                background: "rgba(0,0,0,0.4)",
                borderRadius: "12px",
                padding: "24px",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#ff5f57",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#ffbd2e",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#28ca42",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#e0e0e0",
                  lineHeight: 1.8,
                }}
              >
                <div>
                  <span style={{ color: "#667eea" }}>const</span> app ={" "}
                  <span style={{ color: "#764ba2" }}>createApp</span>();
                </div>
                <div style={{ marginLeft: "16px" }}>
                  app.<span style={{ color: "#f093fb" }}>use</span>(auth());
                </div>
                <div style={{ marginLeft: "16px" }}>
                  app.<span style={{ color: "#f093fb" }}>use</span>(ai());
                </div>
                <div style={{ marginLeft: "16px" }}>
                  app.<span style={{ color: "#f093fb" }}>listen</span>(3000);
                </div>
              </div>
            </div>

            {/* 播放按钮 */}
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                right: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "100px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                <CustomerServiceOutlined style={{ fontSize: "18px" }} />
                3:42 分钟演示
              </div>

              <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<PlayCircleOutlined style={{ fontSize: "28px" }} />}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(true);
                }}
                style={{
                  width: "72px",
                  height: "72px",
                  background:
                    "linear-gradient(135deg, var(--mkt-accent) 0%, var(--mkt-accent-2) 100%)",
                  border: "none",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.5)",
                }}
              />
            </div>
          </div>
        </div>

        {/* 快捷链接 */}
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: "40px" }}>
          <Col>
            <Button
              type="link"
              href="https://github.com/yyong008/remix-antd-admin"
              target="_blank"
              style={{ color: "var(--mkt-muted)" }}
            >
              观看更多演示 →
            </Button>
          </Col>
          <Col>
            <Button
              type="link"
              href="https://remix-antd-admin-docs.vercel.app/"
              target="_blank"
              style={{ color: "var(--mkt-muted)" }}
            >
              阅读完整教程 →
            </Button>
          </Col>
        </Row>
      </div>
    </section>
  );
}
