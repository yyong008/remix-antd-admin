import { useEffect, useState } from "react";
import { IconUser, IconFileText, IconNetwork } from "@tabler/icons-react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatItem[] = [
  {
    label: "周活跃用户",
    value: 8500,
    suffix: "+",
    icon: <IconUser className="size-6" />,
    color: "#6366f1",
  },
  {
    label: "项目模板",
    value: 12,
    suffix: "",
    icon: <IconFileText className="size-6" />,
    color: "#8b5cf6",
  },
  {
    label: "技术栈集成",
    value: 20,
    suffix: "+",
    icon: <IconNetwork className="size-6" />,
    color: "#f093fb",
  },
];

function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

function AnimatedNumber({
  value,
  suffix,
  color,
}: {
  value: number;
  suffix: string;
  color: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(value * easeOut);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-12 px-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl text-white mb-4"
                style={{
                  background: `linear-gradient(135deg, ${stat.color} 0%, color-mix(in srgb, ${stat.color} 80%, transparent) 100%)`,
                  boxShadow: `0 8px 24px color-mix(in srgb, ${stat.color} 30%, transparent)`,
                }}
              >
                {stat.icon}
              </div>

              <h1 className="text-5xl font-bold mb-2 leading-none">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} color={stat.color} />
              </h1>

              <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
