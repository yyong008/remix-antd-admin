import type { LoaderFunctionArgs } from "react-router";
import { Card, CardContent } from "@workspace/ui/components/card";
import { PageHeader } from "~/components/page-header";
import * as m from "~/paraglide/messages.js";

export const loader = async (_args: LoaderFunctionArgs) => {
  return null;
};

export const meta = () => [{ title: m.privacy_page_title() }];

type ItemResolver = () => string;

interface PrivacySection {
  title: () => string;
  body?: () => string;
  intro?: () => string;
  items?: ItemResolver[];
}

const sections: PrivacySection[] = [
  {
    title: () => m.privacy_section_1_title(),
    intro: () => m.privacy_section_1_intro(),
    items: [
      () => m.privacy_section_1_item_1(),
      () => m.privacy_section_1_item_2(),
      () => m.privacy_section_1_item_3(),
    ],
  },
  {
    title: () => m.privacy_section_2_title(),
    intro: () => m.privacy_section_2_intro(),
    items: [
      () => m.privacy_section_2_item_1(),
      () => m.privacy_section_2_item_2(),
      () => m.privacy_section_2_item_3(),
    ],
  },
  {
    title: () => m.privacy_section_3_title(),
    body: () => m.privacy_section_3_body(),
  },
  {
    title: () => m.privacy_section_4_title(),
    intro: () => m.privacy_section_4_intro(),
    items: [
      () => m.privacy_section_4_item_1(),
      () => m.privacy_section_4_item_2(),
      () => m.privacy_section_4_item_3(),
    ],
  },
  {
    title: () => m.privacy_section_5_title(),
    body: () => m.privacy_section_5_body(),
  },
  {
    title: () => m.privacy_section_6_title(),
    body: () => m.privacy_section_6_body(),
  },
  {
    title: () => m.privacy_section_7_title(),
    body: () => m.privacy_section_7_body(),
  },
  {
    title: () => m.privacy_section_8_title(),
    body: () => m.privacy_section_8_body(),
  },
];

export default function Privacy() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-12 pt-10">
      <PageHeader title={m.privacy_heading()} />

      <Card className="rounded-2xl border-border">
        <CardContent className="p-6 md:p-10">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border-l-2 border-brand-primary/70 py-4 pl-4 first:pt-0 last:pb-0"
            >
              <h2 className="mb-3 text-xl font-semibold text-foreground">{section.title()}</h2>
              {section.intro ? (
                <p className="mt-2 leading-[1.8] text-muted-foreground">{section.intro()}</p>
              ) : null}
              {section.items ? (
                <ul className="mt-2 space-y-1 pl-6 leading-[1.8] text-muted-foreground">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item()}</li>
                  ))}
                </ul>
              ) : null}
              {section.body ? (
                <p className="mt-2 leading-[1.8] text-muted-foreground">{section.body()}</p>
              ) : null}
            </div>
          ))}

          <p className="mt-4 border-l-2 border-brand-primary/70 pl-4 leading-[1.8] text-muted-foreground">
            {m.privacy_contact_email()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
