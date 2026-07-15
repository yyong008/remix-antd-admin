import { SectionHeader } from "./_shared/section-header";
import { FeatureCard } from "./_shared/feature-card";
import {
  ReactRouterSvgIcon,
  HonoSvgIcon,
  OpenAI,
  DrizzleSvgIcon,
  ViteSvgIcon,
  TailwindCSS,
} from "./_shared/icons";
import * as m from "~/paraglide/messages.js";
import type { ReactNode } from "react";

type FeatureKey = 1 | 2 | 3 | 4 | 5 | 6;

interface FeatureDef {
  key: FeatureKey;
  icon: ReactNode;
  className?: string;
}

const features: FeatureDef[] = [
  { key: 1, icon: <ReactRouterSvgIcon className="size-6" />, className: "sm:col-span-2" },
  { key: 2, icon: <HonoSvgIcon className="size-6" /> },
  { key: 3, icon: <OpenAI className="size-6" /> },
  { key: 4, icon: <DrizzleSvgIcon className="size-6" />, className: "sm:col-span-2" },
  { key: 5, icon: <ViteSvgIcon className="size-6" /> },
  { key: 6, icon: <TailwindCSS className="size-6" /> },
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
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-screen-xl">
        <SectionHeader
          eyebrow={m.home_features_eyebrow()}
          title={m.home_features_title()}
          subtitle={m.home_features_subtitle()}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.key}
              icon={feature.icon}
              title={featureTitle(feature.key)}
              description={featureDescription(feature.key)}
              className={feature.className}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
