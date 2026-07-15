import { PRODUCT_NAME } from "~/config/product";
import * as m from "~/paraglide/messages.js";
import { BrandButton, BrandIconButton } from "./_shared/brand-button";
import {
  ReactRouterSvgIcon,
  HonoSvgIcon,
  DrizzleSvgIcon,
  GithubSvgIcon,
  RocketIcon,
  EyeIcon,
} from "./_shared/icons";

const trustStrip = [
  { value: "1.2k", label: m.home_hero_trust_stars() },
  { value: "50+", label: m.home_hero_trust_contributors() },
  { value: "v8", label: m.home_hero_trust_router() },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden brand-radial">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="relative z-10">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-4 py-1.5 text-sm font-medium text-brand-primary">
            <RocketIcon className="size-4" />
            {m.home_hero_eyebrow()}
          </span>

          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-balance text-foreground lg:text-6xl">
            {PRODUCT_NAME}
            <span className="mt-1 block bg-brand-gradient bg-clip-text text-transparent">
              {m.home_hero_heading_line1()}
            </span>
          </h1>

          <p className="mb-8 max-w-[520px] text-lg leading-relaxed text-muted-foreground">
            {m.home_hero_description({ product: PRODUCT_NAME })}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <BrandButton
              href="https://github.com/yyong008/remix-antd-admin"
              external
              size="lg"
              iconLeft={<RocketIcon className="size-5" />}
            >
              {m.home_hero_cta_start()}
            </BrandButton>
            <BrandButton
              href="https://remix-antd-admin-docs.vercel.app/"
              external
              variant="secondary"
              size="lg"
              iconLeft={<EyeIcon className="size-5" />}
            >
              {m.home_hero_cta_demo()}
            </BrandButton>
            <BrandIconButton
              href="https://github.com/yyong008/remix-antd-admin"
              external
              label={m.home_hero_cta_github()}
            >
              <GithubSvgIcon className="size-5" />
            </BrandIconButton>
          </div>

          <dl className="mt-10 flex gap-8 border-t border-border pt-6">
            {trustStrip.map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="text-2xl font-bold text-foreground">{item.value}</dt>
                <dd className="text-xs text-muted-foreground">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
              <span className="size-3 rounded-full bg-red-500/80" />
              <span className="size-3 rounded-full bg-yellow-500/80" />
              <span className="size-3 rounded-full bg-green-500/80" />
              <div className="ml-3 flex h-7 flex-1 items-center rounded bg-background px-3 text-xs text-muted-foreground">
                admin.{PRODUCT_NAME.toLowerCase()}.com
              </div>
            </div>
            <img
              src="/images/admin.png"
              alt={m.home_hero_browser_label({ product: PRODUCT_NAME })}
              className="block w-full bg-card"
            />
          </div>

          <div className="absolute -left-4 top-10 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:flex sm:items-center sm:gap-2">
            <ReactRouterSvgIcon className="size-5 text-brand-primary" />
            <span className="text-sm font-semibold text-foreground">React Router v8</span>
          </div>

          <div className="absolute -right-4 top-1/3 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:flex sm:items-center sm:gap-2">
            <HonoSvgIcon className="size-5 text-brand-primary" />
            <span className="text-sm font-semibold text-foreground">Hono RPC</span>
          </div>

          <div className="absolute -bottom-4 left-8 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:flex sm:items-center sm:gap-2">
            <DrizzleSvgIcon className="size-5 text-brand-primary" />
            <span className="text-sm font-semibold text-foreground">D1 / Drizzle</span>
          </div>
        </div>
      </div>
    </section>
  );
}
