import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./_shared/section-header";
import { UsersIcon, FileTextIcon, PlugIcon } from "./_shared/icons";
import * as m from "~/paraglide/messages.js";

type StatKey = "weekly_users" | "templates" | "integrations";

interface StatDef {
  key: StatKey;
  value: number;
  suffix: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}

const stats: StatDef[] = [
  { key: "weekly_users", value: 8500, suffix: "+", Icon: UsersIcon },
  { key: "templates", value: 12, suffix: "", Icon: FileTextIcon },
  { key: "integrations", value: 20, suffix: "+", Icon: PlugIcon },
];

function statLabel(key: StatKey) {
  switch (key) {
    case "weekly_users":
      return m.home_stats_label_weekly_users();
    case "templates":
      return m.home_stats_label_templates();
    case "integrations":
      return m.home_stats_label_integrations();
  }
}

function formatNumber(num: number) {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    const start = performance.now();

    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
}

function StatCard({ def, active }: { def: StatDef; active: boolean }) {
  const value = useCountUp(def.value, active);
  const { Icon } = def;

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-6 text-center">
      <div
        className="flex size-14 items-center justify-center rounded-2xl text-white"
        style={{
          background: "linear-gradient(135deg, var(--brand-primary), var(--brand-accent))",
          boxShadow: "0 8px 24px var(--brand-glow)",
        }}
      >
        <Icon className="size-6" />
      </div>
      <div className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
        {formatNumber(value)}
        {def.suffix}
      </div>
      <div className="text-sm text-muted-foreground">{statLabel(def.key)}</div>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-6 py-12">
      <div className="mx-auto max-w-screen-xl">
        <SectionHeader title={m.home_stats_eyebrow()} align="center" className="mb-10" />
        <div className="grid grid-cols-1 gap-4 rounded-3xl border border-border bg-brand-card-bg p-6 sm:grid-cols-3">
          {stats.map((def) => (
            <StatCard key={def.key} def={def} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
