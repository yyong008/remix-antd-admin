import { Flex, Typography } from "antd";
import { lazy, Suspense, useEffect, useState } from "react";
import { href, useNavigate, useParams } from "react-router";
import type { MetaFunction } from "react-router";
import { m } from "~/paraglide/messages";

const AiChatConversation = lazy(() =>
  import("./ai-chat-conversation").then((m) => ({ default: m.AiChatConversation })),
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

export const meta: MetaFunction = () => {
  return [{ title: m.ai_title() }];
};

export default function Page() {
  const resolvedChatId = useResolvedChatId();

  return (
    <Flex vertical gap={24} style={{ height: "100%", minHeight: 420 }}>
      <Typography.Title level={2} style={{ margin: 0, fontWeight: 600 }}>
        {m.ai_title()}
      </Typography.Title>

      {!resolvedChatId ? (
        <Flex justify="center" align="center" style={{ height: 200 }}>
          <Typography.Text type="secondary">{m.ai_preparing_session()}</Typography.Text>
        </Flex>
      ) : (
        <Suspense
          fallback={
            <Flex justify="center" align="center" style={{ height: 200 }}>
              <Typography.Text type="secondary">{m.ai_loading()}</Typography.Text>
            </Flex>
          }
        >
          <AiChatConversation chatId={resolvedChatId} style={{ minHeight: 480 }} gap={16} />
        </Suspense>
      )}
    </Flex>
  );
}
