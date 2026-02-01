import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { type ChatMessage, ProChat } from "@ant-design/pro-chat";

import { Alert } from "antd";
import { Ollama } from "@langchain/ollama";
import { PageContainer } from "@ant-design/pro-components";
import { ai } from "@/config/ai";
import { useLoaderData } from "react-router";
import { useState } from "react";

export function Route() {
	const loaderData: any = useLoaderData();
	const [modelName] = useState(ai.ollama.initModelName);
	const prochatStyle = {
		height: "calc(100vh - 400px)",
	};

	const streamChatResponse = async (msgs: any[]) => {
		const model = new Ollama({
			model: modelName,
			baseUrl: loaderData.ollama_url || ai.ollama.baseUrl,
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
				style={prochatStyle}
				request={(chats) => {
					const msgs = chatMessages(chats);
					return streamChatResponse(msgs);
				}}
			></ProChat>
		</PageContainer>
	);
}

function chatMessages(chats: ChatMessage<Record<string, any>>[]) {
	return chats.map((chat: any) => {
		if (chat.role === "user") {
			return new HumanMessage(chat.content);
		} else {
			return new AIMessage(chat.content);
		}
	});
}
