import { EmailEditor } from "@react-email/editor";

const content = `
  <h1>Welcome</h1>
  <p>
    This is the simplest way to use the editor. Try selecting text to see the
    bubble menu, or type "/" for slash commands.
  </p>
`;

export function ReactEmailEditor() {
  return <EmailEditor content={content} />;
}
