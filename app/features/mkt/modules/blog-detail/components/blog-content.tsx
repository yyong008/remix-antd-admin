import dompurify from "dompurify";

export function BlogContent({ content }: { content: string }) {
  return (
    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{
        __html: dompurify.sanitize(content),
      }}
    ></div>
  );
}
