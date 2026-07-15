import { Card } from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { SectionHeader } from "./_shared/section-header";
import { CheckIcon } from "./_shared/icons";
import { PRODUCT_NAME } from "~/config/product";
import * as m from "~/paraglide/messages.js";

type FeatureKey =
  | "feature_1"
  | "feature_2"
  | "feature_3"
  | "feature_4"
  | "feature_5"
  | "feature_6"
  | "feature_7"
  | "feature_8"
  | "feature_9";

const features: Array<{ key: FeatureKey; has: boolean }> = [
  { key: "feature_1", has: true },
  { key: "feature_2", has: true },
  { key: "feature_3", has: true },
  { key: "feature_4", has: true },
  { key: "feature_5", has: true },
  { key: "feature_6", has: true },
  { key: "feature_7", has: true },
  { key: "feature_8", has: true },
  { key: "feature_9", has: true },
];

function featureLabel(key: FeatureKey) {
  switch (key) {
    case "feature_1":
      return m.home_comparison_feature_1();
    case "feature_2":
      return m.home_comparison_feature_2();
    case "feature_3":
      return m.home_comparison_feature_3();
    case "feature_4":
      return m.home_comparison_feature_4();
    case "feature_5":
      return m.home_comparison_feature_5();
    case "feature_6":
      return m.home_comparison_feature_6();
    case "feature_7":
      return m.home_comparison_feature_7();
    case "feature_8":
      return m.home_comparison_feature_8();
    case "feature_9":
      return m.home_comparison_feature_9();
  }
}

export function ComparisonSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow={m.home_comparison_eyebrow()}
          title={m.home_comparison_title()}
          subtitle={m.home_comparison_subtitle()}
          className="mb-12"
        />

        <Card className="overflow-hidden rounded-2xl border-border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-[70%]">{m.home_comparison_header_feature()}</TableHead>
                  <TableHead className="text-center">
                    <span className="bg-brand-gradient bg-clip-text font-bold text-transparent">
                      {PRODUCT_NAME}
                    </span>
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground">
                    {m.home_comparison_header_other()}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((item, index) => (
                  <TableRow key={item.key} className="border-border">
                    <TableCell className={index % 2 === 0 ? "bg-muted/40" : "bg-transparent"}>
                      {featureLabel(item.key)}
                    </TableCell>
                    <TableCell
                      className={`text-center ${index % 2 === 0 ? "bg-muted/40" : "bg-transparent"}`}
                    >
                      {item.has ? (
                        <CheckIcon className="mx-auto size-4 text-brand-primary" />
                      ) : null}
                    </TableCell>
                    <TableCell
                      className={`text-center ${index % 2 === 0 ? "bg-muted/40" : "bg-transparent"}`}
                    >
                      <span className="text-muted-foreground/50">—</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="mt-8 rounded-2xl border border-brand-border bg-brand-surface p-6 text-center">
          <h4 className="mb-1 font-semibold text-foreground">{m.home_comparison_footer_title()}</h4>
          <p className="m-0 text-sm text-muted-foreground">{m.home_comparison_footer_subtitle()}</p>
        </div>
      </div>
    </section>
  );
}
