import { generateText, type Message } from "ai";
import { createOllama } from "ollama-ai-provider-v2";
import { Alert, Button, Empty, Flex, Input, Select, Spin, Typography, theme } from "antd";
import { useLoaderData } from "react-router";
import { useEffect, useRef, useState } from "react";

import { ai } from "@/config/ai";
import { PageContainer } from "~/components/page-container";

type SimpleMsg = { role: "user" | "assistant"; content: string };

const SIMPLECHAT_MODEL_KEY = "admin-simplechat-ollama-model";

export function Route() {
  const loaderData = useLoaderData() as { ollama_url?: string };
  const [modelName, setModelName] = useState(ai.ollama.initModelName);
  const [modelOptions, setModelOptions] = useState<{ label: string; value: string }[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [messages, setMessages] = useState<SimpleMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { token } = theme.useToken();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SIMPLECHAT_MODEL_KEY);
      if (saved) setModelName(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    setModelsLoading(true);
    void fetch("/api/ai/models")
      .then((r) => r.json() as Promise<{ models?: string[] }>)
      .then((d) => {
        if (cancelled) return;
        const names = d.models ?? [];
        setModelOptions(names.map((n) => ({ label: n, value: n })));
      })
      .catch(() => {
        if (!cancelled) setModelOptions([]);
      })
      .finally(() => {
        if (!cancelled) setModelsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const history: SimpleMsg[] = [...messages, { role: "user", content: text }];
    setMessages(history);
    setLoading(true);

    try {
      const ollama = createOllama({
        baseUrl: loaderData.ollama_url || `${ai.ollama.baseUrl}/api`,
      });

      const aiMessages: Message[] = history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      const { text: responseText } = await generateText({
        model: ollama(modelName),
        messages: aiMessages,
      });

      setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant" && last.content === "") {
          next[next.length - 1] = {
            role: "assistant",
            content: `Error: ${e instanceof Error ? e.message : String(e)}`,
          };
          return next;
        }
        return [
          ...next,
          {
            role: "assistant",
            content: `Error: ${e instanceof Error ? e.message : String(e)}`,
          },
        ];
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Alert
        message="Simple Chat 直连浏览器侧的 Ollama（AI SDK），可在下方选择本地已拉取的模型。"
        type="info"
        style={{ marginBottom: 16 }}
      />
      <Flex vertical gap={12} style={{ minHeight: 0 }}>
        <Flex align="center" gap={12} wrap="wrap">
          <Typography.Text type="secondary" style={{ flexShrink: 0 }}>
            模型
          </Typography.Text>
          <Select
            showSearch
            optionFilterProp="label"
            style={{ minWidth: 220, maxWidth: "100%", flex: 1 }}
            loading={modelsLoading}
            value={modelName}
            options={
              modelOptions.length > 0 ? modelOptions : [{ label: modelName, value: modelName }]
            }
            onChange={(v) => {
              setModelName(v);
              try {
                localStorage.setItem(SIMPLECHAT_MODEL_KEY, v);
              } catch {
                /* ignore */
              }
            }}
            disabled={loading}
          />
        </Flex>
        <div
          ref={scrollRef}
          style={{
            minHeight: Math.min(480, window.innerHeight - 400),
            overflowY: "auto",
            borderRadius: 8,
            border: `1px solid ${token.colorBorderSecondary}`,
            padding: "8px 12px",
            background: token.colorFillAlter,
          }}
        >
          {messages.length === 0 ? (
            <Empty style={{ paddingTop: 48 }} description="发送一条消息开始对话" />
          ) : (
            <Flex vertical gap={10}>
              {messages.map((m, i) => (
                <Flex key={`${i}-${m.role}`} justify={m.role === "user" ? "end" : "start"}>
                  <div
                    style={{
                      maxWidth: Math.min(720, window.innerWidth),
                      borderRadius: 8,
                      padding: "8px 12px",
                      background: m.role === "user" ? token.colorPrimaryBg : token.colorBgContainer,
                      border: `1px solid ${token.colorBorderSecondary}`,
                    }}
                  >
                    <Typography.Text style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                      {m.content}
                      {m.role === "assistant" &&
                      loading &&
                      m.content === "" &&
                      i === messages.length - 1 ? (
                        <Spin size="small" style={{ marginLeft: 8, verticalAlign: "middle" }} />
                      ) : null}
                    </Typography.Text>
                  </div>
                </Flex>
              ))}
            </Flex>
          )}
        </div>
        <Flex gap={8} align="end" wrap="wrap">
          <Input.TextArea
            style={{ minWidth: 200, flex: 1 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息，Enter 发送，Shift+Enter 换行"
            autoSize={{ minRows: 2, maxRows: 8 }}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            disabled={loading}
          />
          <Button type="primary" loading={loading} onClick={() => void send()}>
            发送
          </Button>
        </Flex>
      </Flex>
    </PageContainer>
  );
}
