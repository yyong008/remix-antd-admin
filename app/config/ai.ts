/**
 * AI 相关前端路由（均在 `/:locale?/admin/...` 或 `/:locale?/ai/...`）：
 * - Chatbot：`/admin/ai/chatbot` 与 `/:locale?/ai/chatbot` — UI 为 Ant Design X（Bubble / Sender + useXChat），
 *   对话接口为 `POST /api/ai/chats/:id/messages`（Vercel AI SDK `streamText` + Ollama），模型列表为 `GET /api/ai/models`
 * - Simple Chat（浏览器直连 Ollama + antd 简易对话 UI）：`/admin/ai/simplechat`
 */
export const ai = {
  ollama: {
    baseUrl: "http://localhost:11434",
    initModelName: "qwen2.5:0.5b",
  },
};
