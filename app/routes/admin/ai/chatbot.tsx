import { useEffect, useState } from "react";
import { href } from "react-router";

import {
  AiChatConversation,
  AiChatLoading,
} from "~/features/ai/modules/chatbot/AiChatConversation";

interface HandleParams {
  locale?: string;
}

export const handle = ({ params }: { params: HandleParams }) => {
  return {
    breadcrumb: [
      {
        href: href("/:locale?/admin/dashboard", { locale: params?.locale }) as any,
        label: "Dashboard",
      },
      {
        label: "AI 助手",
      },
    ],
  };
};

export default function Page() {
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/ai/chats", { method: "POST" })
      .then((r) => r.json() as Promise<{ id?: string }>)
      .then((d) => {
        if (!cancelled && d.id) setChatId(d.id);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Calculate available height: 100dvh - header(~52px) - footer(~48px) - page padding
  const headerHeight = 52;
  const footerHeight = 48;
  const topPadding = 12;
  const bottomPadding = 0;
  const availableHeight = `calc(100dvh - ${headerHeight}px - ${footerHeight}px - ${topPadding}px - ${bottomPadding}px)`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: availableHeight,
        overflow: "hidden",
        padding: "12px 20px 0",
        boxSizing: "border-box",
      }}
    >
      {!chatId ? <AiChatLoading /> : <AiChatConversation chatId={chatId} variant="plain" gap={0} />}
    </div>
  );
}
