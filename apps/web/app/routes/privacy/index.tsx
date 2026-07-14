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
  const h2Style: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: 600,
    marginTop: "24px",
    marginBottom: "16px",
  };

  const pStyle: React.CSSProperties = {
    marginTop: "16px",
    lineHeight: 1.8,
  };

  const ulStyle: React.CSSProperties = {
    marginTop: "8px",
    paddingLeft: "24px",
    lineHeight: 1.8,
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 24px 48px" }}>
      <header style={{ textAlign: "center", padding: "24px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: 600 }}>{m.privacy_heading()}</h1>
      </header>

      <main
        style={{
          margin: "32px auto",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        {sections.map((section, index) => (
          <div key={index}>
            <h2 style={h2Style}>{section.title()}</h2>
            {section.intro ? <p style={pStyle}>{section.intro()}</p> : null}
            {section.items ? (
              <ul style={ulStyle}>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item()}</li>
                ))}
              </ul>
            ) : null}
            {section.body ? <p style={pStyle}>{section.body()}</p> : null}
          </div>
        ))}

        <p style={{ ...pStyle, marginTop: "8px" }}>{m.privacy_contact_email()}</p>
      </main>
    </div>
  );
}
