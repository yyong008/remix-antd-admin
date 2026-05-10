import { useState } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";
import { IconStar } from "@tabler/icons-react";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "张三",
    role: "全栈工程师 @ 某科技公司",
    avatar: "/images/user.jpg",
    content:
      "这是我用过的最好的 React Router 模板。配置简单，文档清晰，让我在一周内就上线了 AI 管理后台。强烈推荐！",
    rating: 5,
  },
  {
    name: "李四",
    role: "技术负责人 @ 创业公司",
    avatar: "/images/user.jpg",
    content:
      "团队从 Remix 迁移到 React Router v7，体验非常顺畅。Hono 的集成让 API 开发变得轻松愉快。",
    rating: 5,
  },
  {
    name: "王五",
    role: "独立开发者",
    avatar: "/images/user.jpg",
    content:
      "开箱即用的 AI 集成和漂亮的 UI 组件库，省去了大量重复工作。唯一缺点是官方文档还能再详细点。",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-[60px] px-6 pb-[100px]">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">用户评价</h2>
          <p className="max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
            来自开发者社区的真实反馈
          </p>
        </div>

        <div className="relative max-w-[800px] mx-auto">
          <Card className="rounded-2xl shadow-[0_24px48px_rgba(0,0,0,0.08)] overflow-hidden">
            <CardContent className="p-6 md:p-12">
              <div className="absolute top-6 right-8 text-6xl opacity-30 text-gray-900 dark:text-gray-100">
                "
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <IconStar
                    key={i}
                    className={`size-5 ${i < testimonials[activeIndex].rating ? "text-yellow-500" : "text-gray-900 dark:text-gray-100"}`}
                  />
                ))}
              </div>

              <p className="text-lg leading-relaxed mb-8 italic min-h-20 text-gray-700 dark:text-gray-300">
                "{testimonials[activeIndex].content}"
              </p>

              <div className="flex items-center gap-4">
                <Avatar className="size-14">
                  <AvatarImage src={testimonials[activeIndex].avatar} />
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded transition-all duration-300 border-0 cursor-pointer ${
                  index === activeIndex
                    ? "w-8 bg-gradient-to-r from-indigo-500 to-violet-500"
                    : "w-2 bg-gray-900 dark:bg-gray-100"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
