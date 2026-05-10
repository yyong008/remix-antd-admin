import { createOllama } from "ollama-ai-provider-v2";
import { Hono } from "hono";
import type { ModelMessage } from "ai";
import { streamText } from "ai";

import type { HonoEnv } from "../types";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

type ChatSession = {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
};

const chats = new Map<string, ChatSession>();

const toChatList = () =>
  Array.from(chats.values())
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((chat) => ({
      id: chat.id,
      title: chat.title,
      updatedAt: chat.updatedAt,
    }));

function getOllamaOrigin(): string {
  const raw =
    (typeof process !== "undefined" && process.env?.OLLAMA_URL) || "http://localhost:11434"
  return raw.replace(/\/$/, "");
}

function getOllamaBaseApiUrl(): string {
  return `${getOllamaOrigin()}/api`;
}

function normalizeMessageContent(content: unknown): string {
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

function toModelMessages(raw: unknown): ModelMessage[] {
  if (!Array.isArray(raw)) return [];
  const out: ModelMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: string }).role;
    const content = normalizeMessageContent((m as { content?: unknown }).content);
    if (!content) continue;
    if (role === "user") {
      out.push({ role: "user", content });
    } else if (role === "assistant") {
      out.push({ role: "assistant", content });
    } else if (role === "system") {
      out.push({ role: "system", content });
    }
  }
  return out;
}

function syncSessionFromClient(chat: ChatSession, modelMessages: ModelMessage[]) {
  const now = new Date().toISOString();
  chat.messages = modelMessages.map((m) => {
    const content = typeof m.content === "string" ? m.content : "";
    const role: "user" | "assistant" = m.role === "assistant" ? "assistant" : "user";
    return {
      id: crypto.randomUUID(),
      role,
      content,
      createdAt: now,
    };
  });
  chat.updatedAt = now;
  const firstUser = modelMessages.find((x) => x.role === "user");
  const firstText = firstUser && typeof firstUser.content === "string" ? firstUser.content : "";
  if (firstText) {
    chat.title = firstText.slice(0, 48) || chat.title;
  }
}

export const aiRouter = new Hono<HonoEnv>();

aiRouter.get("/models", async (c) => {
  try {
    const res = await fetch(`${getOllamaOrigin()}/api/tags`);
    if (!res.ok) {
      return c.json(
        {
          models: [] as string[],
          providers: [] as { id: string; label: string; models: string[] }[],
          error: `Ollama returned ${res.status}`,
        },
        502,
      );
    }
    const data = (await res.json()) as { models?: { name?: string }[] };
    const models = (data.models ?? [])
      .map((m) => m.name)
      .filter((n): n is string => typeof n === "string" && n.length > 0);
    const providers = [{ id: "ollama" as const, label: "Ollama（本地）", models }];
    return c.json({ models, providers });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return c.json(
      {
        models: [] as string[],
        providers: [] as { id: string; label: string; models: string[] }[],
        error: message,
      },
      503,
    );
  }
});

aiRouter.get("/chats", (c) => {
  return c.json({ items: toChatList() });
});

aiRouter.post("/chats", (c) => {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const session: ChatSession = {
    id,
    title: `Chat ${id.slice(0, 6)}`,
    messages: [],
    updatedAt: createdAt,
  };
  chats.set(id, session);
  return c.json({ id });
});

aiRouter.delete("/chats/:id", (c) => {
  const id = c.req.param("id");
  chats.delete(id);
  return c.json({ ok: true });
});

aiRouter.get("/chats/:id/messages", (c) => {
  const id = c.req.param("id");
  const chat = chats.get(id);
  if (!chat) return c.json({ items: [] });
  return c.json({ items: chat.messages });
});

aiRouter.post("/chats/:id/messages", async (c) => {
  const id = c.req.param("id");
  const chat = chats.get(id);
  if (!chat) return c.json({ error: "Chat not found" }, 404);

  let body: { content?: string; messages?: unknown; model?: string } = {};
  try {
    body = await c.req.json();
  } catch {
    body = {};
  }

  let modelMessages: ModelMessage[];
  if (Array.isArray(body.messages) && body.messages.length > 0) {
    modelMessages = toModelMessages(body.messages);
  } else if (typeof body.content === "string" && body.content.trim()) {
    modelMessages = [{ role: "user", content: body.content.trim() }];
  } else {
    return c.json({ error: "Empty message" }, 400);
  }

  if (modelMessages.length === 0) {
    return c.json({ error: "No valid messages" }, 400);
  }

  syncSessionFromClient(chat, modelMessages);

  const ollama = createOllama({
    baseURL: getOllamaBaseApiUrl(),
  });

  const modelName = (body.model as string | undefined) || aiConfig.ollama.initModelName;

  const result = streamText({
    model: ollama.chat(modelName),
    messages: modelMessages,
    onFinish: ({ text }) => {
      const now = new Date().toISOString();
      chat.messages.push({
        id: crypto.randomUUID(),
        role: "assistant",
        content: text,
        createdAt: now,
      });
      chat.updatedAt = now;
    },
  });

  return result.toTextStreamResponse();
});
