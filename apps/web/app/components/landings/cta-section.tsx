import { Card, CardContent } from "@workspace/ui/components/card";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";
import { IconRocket, IconBook, IconCircleCheck } from "@tabler/icons-react";
import { PRODUCT_NAME } from "~/config/product";
import * as m from "~/paraglide/messages.js";

type TrustBadgeKey = "mit" | "prod" | "active" | "docs_zh";

const trustBadges: Array<{ key: TrustBadgeKey }> = [
  { key: "mit" },
  { key: "prod" },
  { key: "active" },
  { key: "docs_zh" },
];

function trustBadgeText(key: TrustBadgeKey) {
  switch (key) {
    case "mit": return m.home_cta_badge_mit();
    case "prod": return m.home_cta_badge_prod();
    case "active": return m.home_cta_badge_active();
    case "docs_zh": return m.home_cta_badge_docs_zh();
  }
}

const testimonials = [
  { avatar: "/images/user.jpg" },
  { avatar: "/images/user.jpg" },
  { avatar: "/images/user.jpg" },
];

export function CTASection() {

  return (
    <section className="px-6">
      <div className="mx-auto max-w-4xl">
        <Card
          className="text-center rounded-3xl border-0 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          }}
        >
          <CardContent className="relative overflow-hidden p-8 md:p-16">
            <div
              className="absolute -top-1/2 -left-1/4 -translate-x-1/2 w-[150%] h-[150%] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-1/3 -right-1/4 translate-x-1/2 w-[120%] h-[120%] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 text-white text-sm font-medium bg-white/15">
                <IconCircleCheck className="size-4 text-emerald-500" />
                {m.home_cta_eyebrow()}
              </div>

              <h2 className="text-5xl font-bold text-white mb-4">{m.home_cta_heading()}</h2>
              <p className="text-lg text-white/85 mb-8 max-w-[560px] mx-auto">
                {m.home_cta_subtitle({ product: PRODUCT_NAME })}
              </p>

              <div className="mb-10">
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="https://github.com/yyong008/remix-antd-admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-white text-indigo-600 hover:bg-white/90 h-14 px-10 text-base font-semibold transition-colors"
                  >
                    <IconRocket className="size-4 mr-2" />
                    {m.home_cta_primary()}
                  </a>
                  <a
                    href="https://remix-antd-admin-docs.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 h-14 px-10 text-base font-semibold transition-colors"
                  >
                    <IconBook className="size-4 mr-2" />
                    {m.home_cta_secondary()}
                  </a>
                </div>
              </div>

              <div className="flex justify-center items-center gap-6 flex-wrap">
                <div className="flex items-center">
                  <div className="flex mr-3">
                    {testimonials.map((t, i) => (
                      <Avatar key={i} className="size-8 border-2 border-white">
                        <AvatarImage src={t.avatar} />
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-white/90 text-sm">{m.home_cta_contributors({ count: "50" })}</span>
                </div>

                <div className="w-px h-6 bg-white/20" />

                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-white/90 text-xs">
                    <IconCircleCheck className="size-3 text-white/60" />
                    {trustBadgeText(badge.key)}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
