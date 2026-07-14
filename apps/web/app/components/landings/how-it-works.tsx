import { Card, CardContent } from "@workspace/ui/components/card";
import { IconCloud, IconSettings, IconRocket } from "@tabler/icons-react";
import * as m from "~/paraglide/messages.js";

type StepKey = 1 | 2 | 3;

const steps: Array<{ key: StepKey; icon: React.ReactNode; color: string }> = [
  { key: 1, icon: <IconCloud className="size-6" />, color: "#6366f1" },
  { key: 2, icon: <IconSettings className="size-6" />, color: "#8b5cf6" },
  { key: 3, icon: <IconRocket className="size-6" />, color: "#6366f1" },
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

export function HowItWorks() {
  return (
    <section className="py-[60px] px-6 pb-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
            {m.home_how_it_works_eyebrow()}
          </h2>
          <p className="max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
            {m.home_how_it_works_subtitle()}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const title = stepTitle(step.key);
            const description = stepDescription(step.key);
            return (
              <div key={index} className="relative h-full transition-all duration-500">
                <Card className="relative h-full rounded-2xl border transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full text-white text-sm font-bold flex items-center justify-center shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${step.color} 0%, color-mix(in srgb, ${step.color} 70%, transparent) 100%)`,
                      }}
                    >
                      {index + 1}
                    </div>

                    <div
                      className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
                      style={{
                        background: `color-mix(in srgb, ${step.color} 10%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${step.color} 30%, transparent)`,
                        color: step.color,
                      }}
                    >
                      {step.icon}
                    </div>

                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h4>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 m-0">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-xl max-w-[600px] mx-auto border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-mono overflow-x-auto">
          <div className="mb-4 font-medium text-gray-900 dark:text-gray-100">
            {m.home_how_it_works_cmd_clone_label()}
          </div>
          <div className="mb-4 text-gray-500 dark:text-gray-400 break-all">
            {m.home_how_it_works_cmd_clone_command()}
          </div>
          <div className="mb-4 font-medium text-gray-900 dark:text-gray-100">
            {m.home_how_it_works_cmd_install_label()}
          </div>
          <div className="mb-4 text-gray-500 dark:text-gray-400">
            {m.home_how_it_works_cmd_install_command()}
          </div>
          <div className="mb-4 font-medium text-gray-900 dark:text-gray-100">
            {m.home_how_it_works_cmd_dev_label()}
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {m.home_how_it_works_cmd_dev_command()}
          </div>
        </div>
      </div>
    </section>
  );
}
