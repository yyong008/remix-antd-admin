import { OpenAIChatProvider, XRequest } from "@ant-design/x-sdk";

import { ai } from "@/config/ai";
import { createTextStreamToOpenAIChunkTransform } from "./text-stream-openai-transform";

export function createOllamaOpenAIChatProvider(chatId: string) {
  return new OpenAIChatProvider({
    request: XRequest(`/api/ai/chats/${chatId}/messages`, {
      manual: true,
      params: {
        model: ai.ollama.initModelName,
        stream: true,
      },
      transformStream: () => createTextStreamToOpenAIChunkTransform(),
    }),
  });
}
