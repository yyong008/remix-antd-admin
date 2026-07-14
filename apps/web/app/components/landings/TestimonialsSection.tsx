import { useState } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";
import { IconStar } from "@tabler/icons-react";
import * as m from "~/paraglide/messages.js";

type TestimonialKey = "user_1" | "user_2" | "user_3";

interface Testimonial {
  key: TestimonialKey;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { key: "user_1", avatar: "/images/user.jpg", rating: 5 },
  { key: "user_2", avatar: "/images/user.jpg", rating: 5 },
  { key: "user_3", avatar: "/images/user.jpg", rating: 5 },
];

function testimonialName(key: TestimonialKey) {
  switch (key) {
    case "user_1":
      return m.home_testimonials_name_1();
    case "user_2":
      return m.home_testimonials_name_2();
    case "user_3":
      return m.home_testimonials_name_3();
  }
}

function testimonialRole(key: TestimonialKey) {
  switch (key) {
    case "user_1":
      return m.home_testimonials_role_1();
    case "user_2":
      return m.home_testimonials_role_2();
    case "user_3":
      return m.home_testimonials_role_3();
  }
}

function testimonialContent(key: TestimonialKey) {
  switch (key) {
    case "user_1":
      return m.home_testimonials_content_1();
    case "user_2":
      return m.home_testimonials_content_2();
    case "user_3":
      return m.home_testimonials_content_3();
  }
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  return (
    <section className="py-[60px] px-6 pb-[100px]">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
            {m.home_testimonials_eyebrow()}
          </h2>
          <p className="max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
            {m.home_testimonials_subtitle()}
          </p>
        </div>

        <div className="relative max-w-[800px] mx-auto">
          <Card className="rounded-2xl shadow-[0_24px48px_rgba(0,0,0,0.08)] overflow-hidden">
            <CardContent className="p-6 md:p-12">
              <div className="absolute top-6 right-8 text-6xl opacity-30 text-gray-900 dark:text-gray-100">
                &ldquo;
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <IconStar
                    key={i}
                    className={`size-5 ${i < current.rating ? "text-yellow-500" : "text-gray-900 dark:text-gray-100"}`}
                  />
                ))}
              </div>

              <p className="text-lg leading-relaxed mb-8 italic min-h-20 text-gray-700 dark:text-gray-300">
                {m.home_testimonials_quote({ content: testimonialContent(current.key) })}
              </p>

              <div className="flex items-center gap-4">
                <Avatar className="size-14">
                  <AvatarImage src={current.avatar} />
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {testimonialName(current.key)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonialRole(current.key)}
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
