import { useState } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  IconRocket,
  IconDatabase,
  IconRobot,
  IconCode,
  IconBolt,
  IconSitemap,
} from "@tabler/icons-react";
import * as m from "~/paraglide/messages.js";

type FeatureKey = 1 | 2 | 3 | 4 | 5 | 6;

interface FeatureBase {
  icon: React.ReactNode;
  color: string;
}

const features: Array<FeatureBase & { key: FeatureKey }> = [
  { key: 1, icon: <IconRocket className="size-6" />, color: "#6366f1" },
  { key: 2, icon: <IconSitemap className="size-6" />, color: "#1890FF" },
  { key: 3, icon: <IconRobot className="size-6" />, color: "#10B981" },
  { key: 4, icon: <IconDatabase className="size-6" />, color: "#0EA5E9" },
  { key: 5, icon: <IconBolt className="size-6" />, color: "#F59E0B" },
  { key: 6, icon: <IconCode className="size-6" />, color: "#06B6D4" },
];

function featureTitle(key: FeatureKey) {
  switch (key) {
    case 1:
      return m.home_features_item_1_title();
    case 2:
      return m.home_features_item_2_title();
    case 3:
      return m.home_features_item_3_title();
    case 4:
      return m.home_features_item_4_title();
    case 5:
      return m.home_features_item_5_title();
    case 6:
      return m.home_features_item_6_title();
  }
}

function featureDescription(key: FeatureKey) {
  switch (key) {
    case 1:
      return m.home_features_item_1_description();
    case 2:
      return m.home_features_item_2_description();
    case 3:
      return m.home_features_item_3_description();
    case 4:
      return m.home_features_item_4_description();
    case 5:
      return m.home_features_item_5_description();
    case 6:
      return m.home_features_item_6_description();
  }
}

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-10 px-6 pb-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
            {m.home_features_eyebrow()}
          </h2>
          <p className="max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
            {m.home_features_subtitle()}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const title = featureTitle(feature.key);
            const description = featureDescription(feature.key);
            return (
              <div
                key={index}
                className="h-full rounded-2xl p-px transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    hoveredIndex === index
                      ? `linear-gradient(135deg, ${feature.color}60 0%, ${feature.color}20 100%)`
                      : "transparent",
                  boxShadow:
                    hoveredIndex === index
                      ? `0 20px 40px color-mix(in srgb, ${feature.color} 25%, transparent), 0 0 0 1px color-mix(in srgb, ${feature.color} 40%, transparent)`
                      : "none",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card
                  className="h-full rounded-xl border transition-all duration-300 overflow-hidden"
                  style={{
                    border: `1px solid color-mix(in srgb, ${feature.color} 30%, transparent)`,
                  }}
                >
                  <CardContent className="p-7 relative">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl text-white mb-5 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color} 0%, color-mix(in srgb, ${feature.color} 80%, transparent) 100%)`,
                        boxShadow:
                          hoveredIndex === index
                            ? `0 8px 32px color-mix(in srgb, ${feature.color} 60%, transparent), 0 0 48px color-mix(in srgb, ${feature.color} 30%, transparent)`
                            : `0 8px 24px color-mix(in srgb, ${feature.color} 40%, transparent)`,
                        transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {feature.icon}
                    </div>

                    <h4
                      className="font-semibold mb-2 transition-colors duration-300"
                      style={{
                        color: hoveredIndex === index ? feature.color : undefined,
                      }}
                    >
                      {title}
                    </h4>

                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 m-0">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
