import { Hono } from "hono";
import { createTextStreamResponse } from "ai";

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

const chunkTextStream = (text: string) => {
	const chunks = text.match(/.{1,16}/g) ?? [text];
	return new ReadableStream<string>({
		start(controller) {
			chunks.forEach((chunk) => controller.enqueue(chunk));
			controller.close();
		},
	});
};

export const aiRouter = new Hono<HonoEnv>();

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
	const body = await c.req.json<{ content?: string }>().catch(() => ({}));
	const content = body.content?.trim();
	if (!content) return c.json({ error: "Empty message" }, 400);

	const now = new Date().toISOString();
	chat.messages.push({
		id: crypto.randomUUID(),
		role: "user",
		content,
		createdAt: now,
	});

	const reply = `AI: ${content}`;
	chat.messages.push({
		id: crypto.randomUUID(),
		role: "assistant",
		content: reply,
		createdAt: new Date().toISOString(),
	});
	chat.updatedAt = new Date().toISOString();

	return createTextStreamResponse({ textStream: chunkTextStream(reply) });
});
