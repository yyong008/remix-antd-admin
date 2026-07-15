import { Card, CardContent } from "@workspace/ui/components/card";
import { SectionHeader } from "./_shared/section-header";
import { CodeBlock } from "./_shared/code-block";
import { GithubSvgIcon, ViteSvgIcon, CloudflareSvgIcon } from "./_shared/icons";
import * as m from "~/paraglide/messages.js";
import type { ReactNode } from "react";

type StepKey = 1 | 2 | 3;

interface StepDef {
  key: StepKey;
  icon: ReactNode;
}

const steps: StepDef[] = [
  { key: 1, icon: <GithubSvgIcon className="size-6" /> },
  { key: 2, icon: <ViteSvgIcon className="size-6" /> },
  { key: 3, icon: <CloudflareSvgIcon className="size-6" /> },
];

function stepTitle(key: StepKey) {
  switch (key) {
    case 1:
      return m.home_how_it_works_step_1_title();
    case 2:
      return m.home_how_it_works_step_2_title();
    case 3:
      return m.home_how_it_works_step_3_title();
  }
}

function stepDescription(key: StepKey) {
  switch (key) {
    case 1:
      return m.home_how_it_works_step_1_description();
    case 2:
      return m.home_how_it_works_step_2_description();
    case 3:
      return m.home_how_it_works_step_3_description();
  }
}

const commands = [
  {
    label: m.home_how_it_works_cmd_clone_label(),
    command: m.home_how_it_works_cmd_clone_command(),
  },
  {
    label: m.home_how_it_works_cmd_install_label(),
    command: m.home_how_it_works_cmd_install_command(),
  },
  { label: m.home_how_it_works_cmd_dev_label(), command: m.home_how_it_works_cmd_dev_command() },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-screen-xl">
        <SectionHeader
          eyebrow={m.home_how_it_works_eyebrow()}
          title={m.home_how_it_works_title()}
          subtitle={m.home_how_it_works_subtitle()}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.key} className="relative overflow-hidden rounded-2xl border-border">
              <CardContent className="p-8">
                <div
                  className="mb-5 flex size-[72px] items-center justify-center rounded-2xl text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary), var(--brand-accent))",
                    boxShadow: "0 8px 24px var(--brand-glow)",
                  }}
                >
                  {step.icon}
                </div>
                <span className="mb-2 inline-flex size-7 items-center justify-center rounded-full bg-brand-surface text-sm font-bold text-brand-primary">
                  {index + 1}
                </span>
                <h4 className="mb-2 mt-3 font-semibold text-foreground">{stepTitle(step.key)}</h4>
                <p className="m-0 text-sm leading-relaxed text-muted-foreground">
                  {stepDescription(step.key)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <CodeBlock commands={commands} />
        </div>
      </div>
    </section>
  );
}
