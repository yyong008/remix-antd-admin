import { useEffect, useState } from "react";

import { LocalModels } from "./components/local-models";
import { Ollama } from "ollama/browser";
import { ProChat } from "@ant-design/pro-chat";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

type Typee = null | Ollama;

let ollama: Typee = null;

export function Route() {
  const data = useLoaderData<typeof loader>();
  const [localList, setLocalList] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  if (!ollama) {
    ollama = new Ollama({ host: data?.data?.OLLAMA_URL });
  }
  const chat = async (messages: any) => {
    const response = await ollama?.chat({
      model: "qwen",
      messages,
      stream: true,
    });

    const stream = new ReadableStream({
      start(controller) {
        try {
          (async () => {
            const encoder = new TextEncoder();
            const reader = response?.[Symbol.asyncIterator](); // 获取迭代器

            // eslint-disable-next-line no-constant-condition
            while (true) {
              const s = await reader?.next(); // 调用next方法获取下一个值
              const { value } = s!;
              const { done } = value;
              const { content } = value.message;
              if (done) {
                controller.close();
                break;
              }

              controller.enqueue(encoder.encode(content)); // 将内容写入流
            }
          })();
        } catch (error) {
          console.log(error);
        }
      },
    });

    return stream;
  };

  useEffect(() => setShowComponent(true), []);

  useEffect(() => {
    ollama?.list().then((list: any) => {
      debugger;
      setLocalList(list ?? []);
    });

    return () => {
      ollama = null;
    };
  }, [data]);

  return (
    <div className="flex flex-col h-[100vh]  w-[100%] items-center">
      <LocalModels list={localList as any} />
      {showComponent && (
        <div className=" bg-white w-[60vw] h-[94%] ">
          <ProChat
            helloMessage={
              "安装 [ollama](https://ollama.com/), 开始与 api 聊天 ~"
            }
            request={async (messages: any) => {
              const stream = await chat(messages);
              return new Response(stream);
            }}
            assistantMeta={{
              avatar: "🧠",
              title: "智脑",
              backgroundColor: "#67dedd",
            }}
          />
        </div>
      )}
    </div>
  );
}
