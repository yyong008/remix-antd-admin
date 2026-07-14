import * as m from "~/paraglide/messages.js";

const logos = [
  { name: "React Router", src: "/images/react-router.svg" },
  { name: "React", src: "/images/react.svg" },
  { name: "TypeScript", src: "/images/typescript.svg" },
  { name: "Vite", src: "/images/vite.svg" },
  { name: "Hono", src: "/images/hono.svg" },
  { name: "Tailwind CSS", src: "/images/tailwind.svg" },
  { name: "Drizzle ORM", src: "/images/drizzle.svg" },
  { name: "Cloudflare", src: "/images/cloudflare.svg" },
  { name: "pnpm", src: "/images/pnpm.svg" },
];

export function LogoCloud() {
  return (
    <section className="py-10 px-6">
      <div className="mx-auto max-w-screen-xl">
        <p className="text-center mb-7 text-xs uppercase tracking-widest font-medium text-gray-500 dark:text-gray-400">
          {m.home_logo_cloud_eyebrow()}
        </p>
        <div className="flex flex-wrap justify-center gap-5 items-center">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center h-11 px-5 opacity-65 hover:opacity-100 transition-opacity duration-300"
            >
              <img src={logo.src} alt={logo.name} className="h-full w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
