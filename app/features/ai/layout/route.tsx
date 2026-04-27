import { Button, Card, Flex, Typography } from "antd";
import { useMemo } from "react";
import { href, Outlet, useNavigate, useParams } from "react-router";

export function Route() {
  const { locale } = useParams();
  const navigate = useNavigate();

  const basePath = useMemo(() => href(`/:locale?/ai`, { locale }), [locale]);
  const createChat = () => {
    navigate(`${basePath}/chatbot/demo`);
  };

  const chatHistory = [
    { id: "demo", title: "产品策略讨论" },
    { id: "demo-2", title: "品牌语气优化" },
    { id: "demo-3", title: "数据分析总结" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <Flex
        gap={24}
        style={{
          margin: "0 auto",
          width: "100%",
          maxWidth: 1152,
          padding: "40px 24px",
          alignItems: "flex-start",
        }}
      >
        <aside style={{ width: "100%", maxWidth: 280, flexShrink: 0 }}>
          <Flex vertical gap={24}>
            <Card
              styles={{ body: { padding: 24 } }}
              style={{
                borderRadius: 24,
              }}
            >
              <Typography.Title level={5} style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                AI Center
              </Typography.Title>
              <Typography.Text
                type="secondary"
                style={{ display: "block", marginTop: 8, fontSize: 12 }}
              >
                Chatbot（Ollama + AI SDK）
              </Typography.Text>
              <div style={{ marginTop: 24 }}>
                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={createChat}
                  style={{
                    height: "auto",
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    fontWeight: 600,
                  }}
                >
                  Chatbot
                  <Typography.Text
                    style={{ fontSize: 12, fontWeight: 400, color: "inherit", opacity: 0.9 }}
                  >
                    新建
                  </Typography.Text>
                </Button>
              </div>
            </Card>

            <Card
              styles={{ body: { padding: 24 } }}
              style={{
                borderRadius: 24,
              }}
            >
              <Flex justify="space-between" align="center">
                <Typography.Text strong style={{ fontSize: 14 }}>
                  聊天历史
                </Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {chatHistory.length} 条
                </Typography.Text>
              </Flex>
              <Flex vertical gap={8} style={{ marginTop: 16 }}>
                {chatHistory.map((item) => (
                  <Button
                    key={item.id}
                    type="text"
                    onClick={() => navigate(`${basePath}/chatbot/${item.id}`)}
                  >
                    <span
                      style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {item.title}
                    </span>
                    <Typography.Text type="secondary" style={{ fontSize: 10, flexShrink: 0 }}>
                      删除
                    </Typography.Text>
                  </Button>
                ))}
                {chatHistory.length === 0 && (
                  <div
                    style={{
                      borderRadius: 16,
                      padding: "24px 16px",
                      textAlign: "center",
                      fontSize: 12,
                    }}
                  >
                    暂无聊天记录
                  </div>
                )}
              </Flex>
            </Card>
          </Flex>
        </aside>

        <section
          style={{
            flex: 1,
            minWidth: 0,
            borderRadius: 32,
            padding: 32,
          }}
        >
          <Outlet />
        </section>
      </Flex>
    </div>
  );
}
