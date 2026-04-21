import { JSX } from "react";

export function Tiper({ title, content }: { title: string; content: JSX.Element | string }) {
  return (
    <a
      href="#"
      style={{
        backgroundColor: "#f1f5f9",
        margin: "0 auto 12px",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        borderRadius: 9999,
        border: "1px solid #92400e",
        padding: "4px 8px",
        fontSize: 14,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          backgroundColor: "#92400e",
          borderRadius: 9999,
          fontSize: 12,
          padding: "2px 8px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>
      <div style={{ fontWeight: "bold" }}>{content}</div>
    </a>
  );
}
