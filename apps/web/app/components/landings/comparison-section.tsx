import { Card } from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { IconCheck } from "@tabler/icons-react";
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
    <section className="py-15 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {m.home_comparison_eyebrow()}
          </h2>
          <p className="max-w-150 mx-auto text-gray-500 dark:text-gray-400">
            {m.home_comparison_subtitle()}
          </p>
        </div>

        <Card className="rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80%]">{m.home_comparison_header_feature()}</TableHead>
                  <TableHead className="text-center">
                    {m.home_comparison_header_support()}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((item, index) => (
                  <TableRow key={item.key}>
                    <TableCell
                      className={
                        index % 2 === 0
                          ? "bg-gray-50 dark:bg-gray-800/50"
                          : "bg-white dark:bg-gray-900"
                      }
                    >
                      {featureLabel(item.key)}
                    </TableCell>
                    <TableCell
                      className={`text-center ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-900"}`}
                    >
                      {item.has ? <IconCheck className="size-4 text-green-500" /> : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="text-center mt-8 p-5">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {m.home_comparison_footer_title()}
          </h4>
          <p className="text-gray-500 dark:text-gray-400 m-0">
            {m.home_comparison_footer_subtitle()}
          </p>
        </div>
      </div>
    </section>
  );
}
