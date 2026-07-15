import type { MetaFunction } from "react-router";

import { Flex, Typography } from "antd";
import { m } from "~/paraglide/messages";
import { lazy, Suspense, useEffect, useState } from "react";

const AiChatConversation = lazy(() =>
  import("./ai-chat-conversation").then((m) => ({ default: m.AiChatConversation })),
);

function useChatSession() {
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const res = await fetch("/api/ai/chats", { method: "POST" });
      const data = (await res.json()) as { id?: string };
      if (!cancelled && data.id) {
        setChatId(data.id);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return chatId;
}

export const handle = () => ({
  breadcrumb: [{ label: m.ai_title() }],
});

export const meta: MetaFunction = () => {
  return [{ title: m.ai_title() }];
};

export default function Page() {
  const chatId = useChatSession();

  return (
    <Flex vertical gap={24} style={{ height: "100%", minHeight: 420 }}>
      <Typography.Title level={2} style={{ margin: 0, fontWeight: 600 }}>
        {m.ai_title()}
      </Typography.Title>

      {!chatId ? (
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
          <AiChatConversation chatId={chatId} style={{ minHeight: 480 }} gap={16} />
        </Suspense>
      )}
    </Flex>
  );
}
