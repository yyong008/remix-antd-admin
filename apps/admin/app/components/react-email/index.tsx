import { EmailEditor } from "@react-email/editor";
import { Inspector } from "@react-email/editor/ui";

import { ReactEmailContainer } from "./container";
import styles from "./styles.module.css";
import { useState } from "react";

import "@react-email/editor/themes/default.css";
// import "@react-email/editor/styles/bubble-menu.css";
// import "@react-email/editor/styles/slash-command.css";
// import "@react-email/editor/styles/inspector.css";

const contentStr = `
  <h1>Newsletter Preview</h1>
  <p>Click any element to inspect it in the sidebar. Select text to see text controls, or click the background for document-level styles.</p>
  <a class="button" data-id="react-email-button" href="https://react.email">Read More</a>
  <p>The inspector sidebar is rendered as a child of EmailEditor.</p>
  <img src="https://placehold.co/600x200" alt="Placeholder" />
`;

export function ReactEmailEditor() {
  const [content, setContent] = useState(contentStr);
  return (
    <ReactEmailContainer
      title="Standalone editor — inspector"
      description="Add an inspector sidebar alongside the standalone EmailEditor — no manual EditorProvider setup needed."
    >
      <div className={styles.wrapper}>
        <EmailEditor
          content={content}
          className={styles.editor}
          onUpdate={async (ref) => setContent(await ref.getEmailHTML())}
        >
          <Sidebar />
        </EmailEditor>
      </div>
    </ReactEmailContainer>
  );
}

function Sidebar() {
  return (
    <Inspector.Root className={styles.sidebar}>
      <Breadcrumb />
      <Inspector.Document />
      <Inspector.Node />
      {/* <Inspector.Text /> */}
    </Inspector.Root>
  );
}

function Breadcrumb() {
  return (
    <nav>
      <ol className={styles.breadcrumbList}>
        <Inspector.Breadcrumb>
          {(segments) =>
            segments.map((segment, i) => {
              const label = segment.node?.nodeType ?? "Layout";
              if (i === segments.length - 1) {
                return (
                  <li key={i} className={styles.breadcrumbItem}>
                    {i !== 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                    <span className={styles.breadcrumbCurrent}>{label}</span>
                  </li>
                );
              }
              return (
                <li key={i} className={styles.breadcrumbItem}>
                  {i !== 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                  <button
                    type="button"
                    className={styles.breadcrumbButton}
                    onClick={() => segment.focus()}
                  >
                    {label}
                  </button>
                </li>
              );
            })
          }
        </Inspector.Breadcrumb>
      </ol>
    </nav>
  );
}
