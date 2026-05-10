import { IconPlayerPlay, IconMessageCircle } from "@tabler/icons-react";

export function VideoDemo() {
  return (
    <section className="py-[60px] px-6">
      <div className="mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">看看它是如何工作的</h2>
          <p className="max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
            快速了解如何使用 React Router Antd Admin 构建现代化的全栈应用
          </p>
        </div>

        <div className="max-w-[900px] mx-auto">
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="h-12 bg-gray-100 dark:bg-gray-800 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <div className="bg-gray-900 p-8 min-h-[240px]">
              <div className="flex gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="font-mono text-sm">
                <div className="text-purple-400 mb-1">
                  <span className="text-blue-400">const</span> app ={" "}
                  <span className="text-yellow-400">createApp</span>();
                </div>
                <div className="text-white/90 ml-4 mb-1">
                  app.<span className="text-blue-400">use</span>(auth());
                </div>
                <div className="text-white/90 ml-4 mb-1">
                  app.<span className="text-blue-400">use</span>(ai());
                </div>
                <div className="text-white/90 ml-4">
                  app.<span className="text-blue-400">listen</span>(3000);
                </div>
              </div>
            </div>

            <div className="h-14 bg-gray-100 dark:bg-gray-800 flex items-center justify-between px-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <IconMessageCircle className="size-4" />
                3:42 分钟演示
              </div>

              <button className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 w-9 h-9">
                <IconPlayerPlay className="size-7" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 py-4">
          <a
            href="https://github.com/yyong008/remix-antd-admin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline"
          >
            观看更多演示 →
          </a>
          <a
            href="https://remix-antd-admin-docs.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline"
          >
            阅读完整教程 →
          </a>
        </div>
      </div>
    </section>
  );
}
