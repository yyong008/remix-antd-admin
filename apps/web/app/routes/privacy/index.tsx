import type { LoaderFunctionArgs } from "react-router";
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
    <div className="mx-auto max-w-200 px-6 pt-25 pb-12">
      <header className="text-center p-6">
        <h1 className="text-[30px] font-semibold">{m.privacy_heading()}</h1>
      </header>

      <main className="mx-auto my-8 p-6 rounded-lg">
        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold mt-6 mb-4">{section.title()}</h2>
            {section.intro ? <p className="mt-4 leading-[1.8]">{section.intro()}</p> : null}
            {section.items ? (
              <ul className="mt-2 pl-6 leading-[1.8]">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item()}</li>
                ))}
              </ul>
            ) : null}
            {section.body ? <p className="mt-4 leading-[1.8]">{section.body()}</p> : null}
          </div>
        ))}

        <p className="mt-2 leading-[1.8]">{m.privacy_contact_email()}</p>
      </main>
    </div>
  );
}
