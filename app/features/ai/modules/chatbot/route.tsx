import { Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { href, useNavigate, useParams } from "react-router";

import { AiChatConversation, AiChatLoading } from "./AiChatConversation";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Resolves a server chat session id (creates one for slugs like `demo`). */
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
        navigate(href(`/:locale?/ai/chatbot/:id`, { locale, id: data.id }), { replace: true });
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
      navigate(href(`/:locale?/ai/chatbot/:id`, { locale, id: data.id }), { replace: true });
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [rawId, locale, navigate]);

  return chatId;
}

/** Marketing-site AI chat: Ollama via `/api/ai` + Ant Design X. */
export function Route() {
  const { locale } = useParams();
  const chatId = useResolvedChatId();

  return (
    <Flex vertical gap={24} style={{ height: "100%", minHeight: 420 }}>
      <div>
        <Typography.Text
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "var(--mkt-muted)",
          }}
        >
          AI Chatbot
        </Typography.Text>
        <Typography.Title level={2} style={{ margin: "8px 0 0", fontWeight: 600 }}>
          对话
        </Typography.Title>
        <Typography.Paragraph
          style={{ marginTop: 8, marginBottom: 0, color: "var(--mkt-muted)", fontSize: 14 }}
        >
          当前语言：
          <Typography.Text strong style={{ color: "var(--mkt-text)" }}>
            {locale ?? "—"}
          </Typography.Text>
        </Typography.Paragraph>
      </div>

      {!chatId ? (
        <AiChatLoading />
      ) : (
        <AiChatConversation chatId={chatId} style={{ minHeight: 480 }} gap={16} />
      )}
    </Flex>
  );
}
