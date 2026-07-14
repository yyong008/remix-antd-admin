import { Flex, Typography } from "antd";
import { lazy, Suspense, useEffect, useState } from "react";
import { href, useNavigate, useParams } from "react-router";

const AiChatConversation = lazy(() =>
  import("./AiChatConversation").then((m) => ({ default: m.AiChatConversation })),
);

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function useResolvedChatId() {
  const { locale, id: rawId } = useParams();
  const navigate = useNavigate();
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!rawId) {
        const res = await fetch("/api/ai/chats", { method: "POST" });
        const data = (await res.json()) as { id?: string };
        if (cancelled || !data.id) return;
        setChatId(data.id);
        navigate(href("/:locale?/admin/ai/:id", { locale, id: data.id }), { replace: true });
        return;
      }

      if (UUID_RE.test(rawId)) {
        setChatId(rawId);
        return;
      }

      const res = await fetch("/api/ai/chats", { method: "POST" });
      const data = (await res.json()) as { id?: string };
      if (cancelled || !data.id) return;
      setChatId(data.id);
      navigate(href("/:locale?/admin/ai/:id", { locale, id: data.id }), { replace: true });
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [rawId, locale, navigate]);

  return chatId;
}

export function Route() {
  const { locale } = useParams();
  const resolvedChatId = useResolvedChatId();

  return (
    <Flex vertical gap={24} style={{ height: "100%", minHeight: 420 }}>
      <div>
        <Typography.Text
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
          }}
        >
          AI Chatbot
        </Typography.Text>
        <Typography.Title level={2} style={{ margin: "8px 0 0", fontWeight: 600 }}>
          对话
        </Typography.Title>
        <Typography.Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 14 }}>
          当前语言：
          <Typography.Text strong>{locale ?? "—"}</Typography.Text>
        </Typography.Paragraph>
      </div>

      {!resolvedChatId ? (
        <Flex justify="center" align="center" style={{ height: 200 }}>
          <Typography.Text type="secondary">准备会话...</Typography.Text>
        </Flex>
      ) : (
        <Suspense
          fallback={
            <Flex justify="center" align="center" style={{ height: 200 }}>
              <Typography.Text type="secondary">加载中...</Typography.Text>
            </Flex>
          }
        >
          <AiChatConversation chatId={resolvedChatId} style={{ minHeight: 480 }} gap={16} />
        </Suspense>
      )}
    </Flex>
  );
}
