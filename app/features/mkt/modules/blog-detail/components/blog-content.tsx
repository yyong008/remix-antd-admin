import dompurify from "dompurify";

export function BlogContent({ content }: { content: string }) {
  return (
    <div
      style={{
        color: "var(--mkt-text)",
        lineHeight: 1.9,
        fontSize: "16px",
      }}
      dangerouslySetInnerHTML={{
        __html: dompurify.sanitize(content || ""),
      }}
    />
  );
}
