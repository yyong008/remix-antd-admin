import { Card, CardContent } from "@workspace/ui/components/card";
import { IconCloud, IconSettings, IconRocket } from "@tabler/icons-react";

const steps = [
  {
    icon: <IconCloud className="size-6" />,
    title: "克隆项目模板",
    description: "使用 Git 克隆或使用 CLI 工具创建新项目",
    color: "#6366f1",
  },
  {
    icon: <IconSettings className="size-6" />,
    title: "配置环境变量",
    description: "复制 .env.example 并配置必要的 API 密钥和数据库连接",
    color: "#8b5cf6",
  },
  {
    icon: <IconRocket className="size-6" />,
    title: "启动开发服务器",
    description: "运行 pnpm dev 开始开发，访问 http://localhost:5173",
    color: "#6366f1",
  },
];

export function HowItWorks() {
  return (
    <section className="py-[60px] px-6 pb-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">快速上手</h2>
          <p className="max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
            三步启动你的下一个全栈项目
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative h-full transition-all duration-500">
              <Card className="relative h-full rounded-2xl border transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full text-white text-sm font-bold flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${step.color} 0%, color-mix(in srgb, ${step.color} 70%, transparent) 100%)`,
                    }}
                  >
                    {index + 1}
                  </div>

                  <div
                    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
                    style={{
                      background: `color-mix(in srgb, ${step.color} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${step.color} 30%, transparent)`,
                      color: step.color,
                    }}
                  >
                    {step.icon}
                  </div>

                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{step.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 m-0">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl max-w-[600px] mx-auto border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-mono overflow-x-auto">
          <div className="mb-4 font-medium text-gray-900 dark:text-gray-100"># 克隆项目</div>
          <div className="mb-4 text-gray-500 dark:text-gray-400 break-all">git clone https://github.com/yyong008/remix-antd-admin.git</div>
          <div className="mb-4 font-medium text-gray-900 dark:text-gray-100"># 安装依赖</div>
          <div className="mb-4 text-gray-500 dark:text-gray-400">pnpm install</div>
          <div className="mb-4 font-medium text-gray-900 dark:text-gray-100"># 启动开发</div>
          <div className="text-gray-500 dark:text-gray-400">pnpm dev</div>
        </div>
      </div>
    </section>
  );
}
