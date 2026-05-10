import { ApiOutlined, DownOutlined } from "@ant-design/icons";
import { Bubble, Sender } from "@ant-design/x";
import { useXChat } from "@ant-design/x-sdk";
import type { MenuProps, SelectProps } from "antd";
import { Button, Dropdown, Flex, Spin, theme } from "antd";
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";

import { ai } from "~/config/ai";
import { createOllamaOpenAIChatProvider } from "./lib/create-ollama-chat-provider";

const MODEL_STORAGE_KEY = "ai-chat-ollama-model";

function buildModelMenuItems(
  selectOptions: SelectProps["options"],
  onPick: (model: string) => void,
): MenuProps["items"] {
  if (!selectOptions?.length) return [];
  const first = selectOptions[0];
  if (first && typeof first === "object" && "options" in first && Array.isArray(first.options)) {
    return selectOptions
      .map((group, i) => {
        if (
          !group ||
          typeof group !== "object" ||
          !("options" in group) ||
          !Array.isArray(group.options)
        ) {
          return null;
        }
        const g = group as {
          label?: ReactNode;
          options?: { label?: ReactNode; value?: string | number }[];
        };
        return {
          type: "group" as const,
          key: `g-${i}`,
          label: g.label,
          children: (g.options ?? []).map((opt) => ({
            key: String(opt.value),
            label: opt.label,
            onClick: () => onPick(String(opt.value)),
          })),
        };
      })
      .filter(Boolean) as MenuProps["items"];
  }
  return selectOptions.map((opt) => {
    if (!opt || typeof opt !== "object" || "options" in opt) return null;
    const o = opt as { label?: ReactNode; value?: string | number };
    return {
      key: String(o.value),
      label: o.label,
      onClick: () => onPick(String(o.value)),
    };
  }) as MenuProps["items"];
}

function bubbleText(content: unknown): string {
  if (typeof content === "string") return content;
  if (
    content &&
    typeof content === "object" &&
    "text" in content &&
    typeof (content as { text: unknown }).text === "string"
  ) {
    return (content as { text: string }).text;
  }
  return "";
}

type Props = {
  chatId: string;
  /** @deprecated Prefer `style` + Ant Design layout */
  className?: string;
  style?: CSSProperties;
  gap?: number;
  /** `plain` uses neutral borders for admin shell; `mkt` uses marketing CSS variables. */
  variant?: "mkt" | "plain";
  /** Override localStorage key when multiple chat surfaces share one origin. */
  modelStorageKey?: string;
};

export function AiChatConversation({
  chatId,
  className,
  style: outerStyle,
  gap = 16,
  variant = "mkt",
  modelStorageKey = MODEL_STORAGE_KEY,
}: Props) {
  const { token } = theme.useToken();
  const [model, setModel] = useState(ai.ollama.initModelName);
  const [modelSelectOptions, setModelSelectOptions] = useState<SelectProps["options"]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(modelStorageKey);
      if (saved) setModel(saved);
    } catch {
      /* ignore */
    }
  }, [modelStorageKey]);

  useEffect(() => {
    let cancelled = false;
    setModelsLoading(true);
    void fetch("/api/ai/models")
      .then(
        (r) =>
          r.json() as Promise<{
            models?: string[];
            providers?: { id: string; label: string; models: string[] }[];
          }>,
      )
      .then((d) => {
        if (cancelled) return;
        const names = d.models ?? [];
        const providers = d.providers?.filter((p) => p.models.length > 0) ?? [];
        if (providers.length > 0) {
          setModelSelectOptions(
            providers.map((p) => ({
              label: p.label,
              options: p.models.map((n) => ({ label: n, value: n })),
            })),
          );
        } else {
          setModelSelectOptions(names.map((n) => ({ label: n, value: n })));
        }
      })
      .catch(() => {
        if (!cancelled) setModelSelectOptions([]);
      })
      .finally(() => {
        if (!cancelled) setModelsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const provider = useMemo(() => createOllamaOpenAIChatProvider(chatId), [chatId]);

  const shellStyle: CSSProperties = useMemo(
    () =>
      variant === "plain"
        ? {
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            flex: 1,
            borderRadius: 8,
            border: "1px solid rgba(5,5,5,0.08)",
            background: "var(--ant-color-bg-container)",
          }
        : {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 16,
          },
    [variant],
  );

  const listRegionStyle: CSSProperties = useMemo(
    () => ({
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: 16,
    }),
    [variant],
  );

  const { messages, onRequest, isRequesting, abort } = useXChat({
    provider,
    defaultMessages: [
      {
        id: "welcome",
        message: {
          role: "assistant",
          content: "你好，我是通过 Ollama + AI SDK 提供回复的助手。输入问题后回车发送。",
        },
        status: "success",
      },
    ],
    requestFallback: (_, { error }) => ({
      role: "assistant",
      content: error.message || "请求失败，请稍后重试。",
    }),
  });

  const menuOptions =
    modelSelectOptions && modelSelectOptions.length > 0
      ? modelSelectOptions
      : [{ label: model, value: model }];

  const persistModel = (m: string) => {
    setModel(m);
    try {
      localStorage.setItem(modelStorageKey, m);
    } catch {
      /* ignore */
    }
  };

  const modelFooter = (
    <Flex align="center" justify="flex-start" gap={8} style={{ width: "100%", minWidth: 0 }}>
      <Dropdown
        placement="topLeft"
        trigger={["click"]}
        disabled={isRequesting}
        menu={{
          items: buildModelMenuItems(menuOptions, persistModel),
          selectable: true,
          selectedKeys: [model],
        }}
      >
        <Button
          size="small"
          loading={modelsLoading}
          disabled={isRequesting}
          style={{
            display: "inline-flex",
            maxWidth: "min(100%, 320px)",
            alignItems: "center",
            gap: 4,
            border: `1px solid ${token.colorBorderSecondary}`,
            background: token.colorFillQuaternary,
            boxShadow: "none",
          }}
        >
          <ApiOutlined style={{ color: token.colorPrimary, flexShrink: 0 }} />
          <span
            style={{
              minWidth: 0,
              maxWidth: 220,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "start",
              fontSize: 12,
              fontWeight: 400,
            }}
          >
            {model}
          </span>
          <DownOutlined
            style={{ marginInlineStart: 2, fontSize: 10, opacity: 0.65, flexShrink: 0 }}
          />
        </Button>
      </Dropdown>
    </Flex>
  );

  return (
    <Flex
      vertical
      gap={gap}
      className={className}
      style={{ height: "100%", width: "100%", overflow: "hidden", ...outerStyle }}
    >
      <div style={shellStyle}>
        <div style={listRegionStyle}>
          <Bubble.List
            role={{
              assistant: { placement: "start" },
              user: { placement: "end" },
            }}
            items={messages.map(({ id, message, status }) => {
              const role = message.role as "assistant" | "user";
              const isAssistantStreaming =
                role === "assistant" && (status === "loading" || status === "updating");
              return {
                key: String(id),
                role,
                content: bubbleText(message.content),
                loading: status === "loading",
                streaming: isAssistantStreaming,
              };
            })}
          />
        </div>
        <Sender
          styles={{
            root: {
              position: "sticky",
              bottom: 0,
              borderRadius: 0,
              border: "none",
              boxShadow: "none",
              background: "transparent",
              paddingInline: 12,
              paddingBottom: 12,
              paddingTop: 8,
            },
            footer: {
              borderTop: `1px solid ${token.colorBorderSecondary}`,
              background: token.colorFillAlter,
            },
          }}
          loading={isRequesting}
          placeholder="输入消息，Enter 发送"
          footer={modelFooter}
          value={inputValue}
          onChange={setInputValue}
          onSubmit={(msg) => {
            onRequest({
              messages: [{ role: "user", content: msg }] as any,
              model,
            });
            setInputValue("");
          }}
          onCancel={abort}
        />
      </div>
    </Flex>
  );
}

export function AiChatLoading() {
  return (
    <Flex justify="center" align="center" style={{ height: "100%", width: "100%" }}>
      <Spin tip="准备会话…" />
    </Flex>
  );
}
