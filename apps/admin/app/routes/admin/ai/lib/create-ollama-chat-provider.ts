import { OpenAIChatProvider, XRequest } from "@ant-design/x-sdk";

import { createTextStreamToOpenAIChunkTransform } from "./text-stream-openai-transform";

export function createOllamaOpenAIChatProvider(chatId: string, model: string) {
  return new OpenAIChatProvider({
    request: XRequest(`/api/ai/chats/${chatId}/messages`, {
      manual: true,
      params: {
        model,
        stream: true,
      },
      transformStream: () => createTextStreamToOpenAIChunkTransform(),
    } as any),
  });
}
