import { AIMessage, HumanMessage } from "@langchain/core/messages";

import { Alert } from "antd";
import { Ollama } from "@langchain/ollama";
import { PageContainer } from "@ant-design/pro-components";
import { ProChat } from "@ant-design/pro-chat";
import { useLoaderData } from "react-router";
import { useState } from "react";

export function Route() {
  const loaderData: any = useLoaderData();
  const [modelName] = useState("qwen2.5:0.5b");

  const streamChatResponse = async (msgs: any[]) => {
    const model = new Ollama({
      model: modelName,
      baseUrl: loaderData.ollama_url || "http://localhost:11434",
    });

    const response = await model.stream(msgs);
    const reader = response.getReader();

    const decoder = new TextDecoder("utf-8");
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        function push() {
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              if (typeof value === "string") {
                controller.enqueue(encoder.encode(value));
              } else {
                const chunk = decoder.decode(value, { stream: true });
                const message = chunk.replace("data: ", "");
                const parsed = JSON.parse(message);
                controller.enqueue(
                  encoder.encode(parsed.choices[0].delta.content),
                );
              }
              push();
            })
            .catch((err) => {
              console.error("读取流中的数据时发生错误", err);
              controller.error(err);
            });
        }
        push();
      },
    });
    return new Response(readableStream);
  };
  return (
    <PageContainer>
      <Alert
        message={`Simple Chat 使用 Ollama 模型 ${modelName}，支持流式输出。`}
        type="warning"
        className="mb-4"
      />

      <ProChat
        style={{
          height: "calc(100vh - 400px)",
        }}
        request={(chats) => {
          const msgs = chats.map((chat: any) => {
            if (chat.role === "user") {
              return new HumanMessage(chat.content);
            } else {
              return new AIMessage(chat.content);
            }
          });
          return streamChatResponse(msgs);
        }}
      ></ProChat>
    </PageContainer>
  );
}
