import * as m from "~/paraglide/messages.js";
import {
  ReactRouterSvgIcon,
  ReactSvgIcon,
  TypeScript,
  HonoSvgIcon,
  CloudflareSvgIcon,
  DrizzleSvgIcon,
  TailwindCSS,
  Turborepo,
  ViteSvgIcon,
} from "./_shared/icons";

const logos = [
  { name: "React Router", Icon: ReactRouterSvgIcon },
  { name: "React", Icon: ReactSvgIcon },
  { name: "TypeScript", Icon: TypeScript },
  { name: "Hono", Icon: HonoSvgIcon },
  { name: "Cloudflare", Icon: CloudflareSvgIcon },
  { name: "Drizzle", Icon: DrizzleSvgIcon },
  { name: "Tailwind CSS", Icon: TailwindCSS },
  { name: "Turborepo", Icon: Turborepo },
  { name: "Vite", Icon: ViteSvgIcon },
];

export function LogoCloud() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-screen-xl">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {m.home_logo_cloud_eyebrow()}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {logos.map(({ name, Icon }) => (
            <div
              key={name}
              title={name}
              className="flex h-10 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
            >
              <Icon className="h-9 w-auto text-foreground" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
