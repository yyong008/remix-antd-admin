import dompurify from "dompurify";

export function BlogContent({ content }: { content: string }) {
  return (
    <div
      style={{
        color: "var(--mkt-text)",
        lineHeight: 1.8,
      }}
      dangerouslySetInnerHTML={{
        __html: dompurify.sanitize(content || ""),
      }}
    />
  );
}
