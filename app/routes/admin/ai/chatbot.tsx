import { useEffect, useState } from "react";

import { PageContainer } from "~/components/page-container";
import {
  AiChatConversation,
  AiChatLoading,
} from "~/features/ai/modules/chatbot/AiChatConversation";

export default function Page() {
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/ai/chats", { method: "POST" })
      .then((r) => r.json())
      .then((d: { id?: string }) => {
        if (!cancelled && d.id) setChatId(d.id);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageContainer
      ghost
      title="Chatbot"
      subTitle="Ant Design X · Ollama · Vercel AI SDK（streamText）"
    >
      {!chatId ? <AiChatLoading /> : <AiChatConversation chatId={chatId} variant="plain" />}
    </PageContainer>
  );
}
