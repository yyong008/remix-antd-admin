import { Card } from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { IconCheck } from "@tabler/icons-react";

const features = [
  { feature: "React Router v7 支持", has: true },
  { feature: "Tailwind CSS 组件库", has: true },
  { feature: "Hono API 集成", has: true },
  { feature: "AI SDK 支持", has: true },
  { feature: "Drizzle ORM", has: true },
  { feature: "开箱即用的 AI 功能", has: true },
  { feature: "原生 CSS 暗色模式", has: true },
  { feature: "Cloudflare 部署优化", has: true },
  { feature: "中文文档", has: true },
];

export function ComparisonSection() {
  return (
    <section className="py-[60px] px-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">技术特性</h2>
          <p className="max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
            React Router Antd Admin 内置的功能特性，开箱即用
          </p>
        </div>

        <Card className="rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80%]">功能特性</TableHead>
                  <TableHead className="text-center">支持</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((item, index) => (
                  <TableRow key={item.feature}>
                    <TableCell className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-900"}>
                      {item.feature}
                    </TableCell>
                    <TableCell className={`text-center ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-900"}`}>
                      {item.has ? <IconCheck className="size-4 text-green-500" /> : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="text-center mt-8 p-5">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">一站式全栈开发</h4>
          <p className="text-gray-500 dark:text-gray-400 m-0">
            从前端到后端，从 AI 到数据库 — 一个模板搞定所有
          </p>
        </div>
      </div>
    </section>
  );
}
