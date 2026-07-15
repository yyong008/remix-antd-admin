import { Card, CardContent } from "@workspace/ui/components/card";
import { BrandButton } from "./_shared/brand-button";
import { InitialsAvatar } from "./_shared/initials-avatar";
import {
  CheckIcon,
  RocketIcon,
  EyeIcon,
  GithubSvgIcon,
  CloudflareSvgIcon,
  ReactRouterSvgIcon,
} from "./_shared/icons";
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
    case "mit":
      return m.home_cta_badge_mit();
    case "prod":
      return m.home_cta_badge_prod();
    case "active":
      return m.home_cta_badge_active();
    case "docs_zh":
      return m.home_cta_badge_docs_zh();
  }
}

const contributorNames = ["Yong Wang", "Lei Chen", "Sara Lin", "Tom Hu", "Mia Zhao"];

export function CTASection() {
  return (
    <section className="px-6 pb-24 pt-8">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden rounded-3xl border-0 brand-gradient shadow-[0_24px_64px_var(--brand-glow)]">
          <CardContent className="relative overflow-hidden p-8 md:p-16">
            <div className="pointer-events-none absolute -right-10 -top-10 opacity-10">
              <ReactRouterSvgIcon className="size-48 text-white" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:36px_36px]" />

            <div className="relative z-10">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white">
                <CheckIcon className="size-4 text-emerald-300" />
                {m.home_cta_eyebrow()}
              </span>

              <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
                {m.home_cta_heading()}
              </h2>
              <p className="mb-8 max-w-[36rem] text-lg text-white/85">
                {m.home_cta_subtitle({ product: PRODUCT_NAME })}
              </p>

              <div className="mb-10 flex flex-wrap justify-center gap-4">
                <BrandButton
                  href="https://github.com/yyong008/remix-antd-admin"
                  external
                  size="lg"
                  variant="primary"
                  className="!bg-white !text-brand-primary-600 shadow-lg hover:!bg-white/90"
                  iconLeft={<RocketIcon className="size-5" />}
                >
                  {m.home_cta_primary()}
                </BrandButton>
                <BrandButton
                  href="https://remix-antd-admin-docs.vercel.app/"
                  external
                  size="lg"
                  variant="secondary"
                  className="!border-white/30 !bg-white/15 !text-white hover:!bg-white/25"
                  iconLeft={<EyeIcon className="size-5" />}
                >
                  {m.home_cta_secondary()}
                </BrandButton>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center">
                  <div className="mr-3 flex -space-x-2">
                    {contributorNames.map((name) => (
                      <InitialsAvatar
                        key={name}
                        name={name}
                        size={32}
                        className="ring-2 ring-white"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-white/90">
                    {m.home_cta_contributors({ count: "50" })}
                  </span>
                </div>

                <div className="hidden h-6 w-px bg-white/20 sm:block" />

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <GithubSvgIcon className="size-5 text-white/80" />
                  <CloudflareSvgIcon className="size-5 text-white/80" />
                  <ReactRouterSvgIcon className="size-5 text-white/80" />
                  {trustBadges.map((badge) => (
                    <div
                      key={badge.key}
                      className="flex items-center gap-1.5 text-xs text-white/90"
                    >
                      <CheckIcon className="size-3 text-emerald-300" />
                      {trustBadgeText(badge.key)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
