import { Card, CardContent } from "@workspace/ui/components/card";
import { SectionHeader } from "./_shared/section-header";
import { InitialsAvatar } from "./_shared/initials-avatar";
import { StarIcon } from "./_shared/icons";
import * as m from "~/paraglide/messages.js";

type TestimonialKey = "user_1" | "user_2" | "user_3";

interface Testimonial {
  key: TestimonialKey;
}

const testimonials: Testimonial[] = [{ key: "user_1" }, { key: "user_2" }, { key: "user_3" }];

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
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-screen-xl">
        <SectionHeader
          eyebrow={m.home_testimonials_eyebrow()}
          title={m.home_testimonials_title()}
          subtitle={m.home_testimonials_subtitle()}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item) => {
            const name = testimonialName(item.key);
            return (
              <Card key={item.key} className="rounded-2xl border-border shadow-sm">
                <CardContent className="flex h-full flex-col p-7">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="size-4 text-yellow-500" />
                    ))}
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {m.home_testimonials_quote({ content: testimonialContent(item.key) })}
                  </p>
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={name} size={44} />
                    <div>
                      <div className="text-sm font-semibold text-foreground">{name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonialRole(item.key)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
