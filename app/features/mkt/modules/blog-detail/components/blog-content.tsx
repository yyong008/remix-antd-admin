import dompurify from "dompurify";

export function BlogContent({ content }: { content: string }) {
  return (
    <div
      style={{
        lineHeight: 1.9,
        fontSize: "16px",
      }}
      dangerouslySetInnerHTML={{
        __html: dompurify.sanitize(content || ""),
      }}
    />
  );
}
