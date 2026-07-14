import { IconRocket, IconEye, IconExternalLink } from "@tabler/icons-react";
import { PRODUCT_NAME } from "~/config/product";
import * as m from "~/paraglide/messages.js";

export function HeroSection() {
  return (
    <section className="relative px-6 py-20 lg:py-24 mx-auto overflow-hidden max-w-screen-xl">
      <div className="absolute top-0 right-0 w-[50%] h-[120%] rounded-full bg-[radial-gradient(circle,rgba(255,107,61,0.15)_0%,transparent_70%)] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[100%] rounded-full bg-[radial-gradient(circle,rgba(42,109,244,0.12)_0%,transparent_70%)] pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-48 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm shadow-md animate-bounce" style={{ animationIterationCount: "infinite", animationDuration: "3s" }}>
            <span className="text-lg animate-ping" style={{ animationIterationCount: "infinite", animationDuration: "2s" }}>⚡</span>
              <span className="text-muted-foreground">{m.home_hero_eyebrow()}</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-5 tracking-tight text-gray-900 dark:text-gray-100">
            {PRODUCT_NAME}
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">{m.home_hero_heading_line1()}</span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400 mb-8 max-w-[500px]">
            {m.home_hero_description({ product: PRODUCT_NAME })}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/yyong008/remix-antd-admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 h-12 px-8 text-base font-medium transition-colors"
            >
              <IconRocket className="size-5 mr-2" />
              {m.home_hero_cta_start()}
            </a>
            <a
              href="https://remix-antd-admin-docs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 h-12 px-8 text-base font-medium transition-colors"
            >
              <IconEye className="size-5 mr-2" />
              {m.home_hero_cta_demo()}
            </a>
            <a
              href="https://github.com/yyong008/remix-antd-admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 h-12 px-8 text-base font-medium transition-colors"
            >
              <IconExternalLink className="size-5 mr-2" />
              {m.home_hero_cta_github()}
            </a>
          </div>

          <div className="flex gap-8 mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">50+</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{m.home_hero_stat_contributors_label()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">v7</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{m.home_hero_stat_router_label()}</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex-1 h-7 ml-3 px-3 bg-gray-100 dark:bg-gray-800 rounded flex items-center text-xs text-gray-500">
              admin.remix-antd-admin.com
            </div>
          </div>
          <img src="/images/admin.png" alt={m.home_hero_browser_label({ product: PRODUCT_NAME })} className="w-full block bg-white dark:bg-gray-900" />

          <div className="absolute top-4 right-4 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
