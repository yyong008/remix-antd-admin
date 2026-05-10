import { Tag } from "antd";
import { Link } from "react-router";

import { parseLinkUrl } from "~/utils/link-url";

import { LinkSvg } from "./LinkSvg";

type Props = {
  url: string;
};

/**
 * 外链新标签打开；站内路径用 SPA Link，避免 `<a target="_blank">` 误伤内部路由。
 */
export function LinkUrlDisplay({ url }: Props) {
  const parsed = parseLinkUrl(url);

  const body = (
    <span
      style={{
        display: "inline-flex",
        minWidth: 0,
        maxWidth: "100%",
        alignItems: "center",
        gap: 8,
      }}
    >
      {parsed.kind === "internal" ? (
        <Tag color="purple" style={{ margin: 0, flexShrink: 0 }}>
          站内
        </Tag>
      ) : parsed.kind === "invalid" ? (
        <Tag color="default" style={{ margin: 0, flexShrink: 0 }}>
          无效
        </Tag>
      ) : (
        <Tag color="cyan" style={{ margin: 0, flexShrink: 0 }}>
          外链
        </Tag>
      )}
      <span
        style={{
          minWidth: 0,
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: 13,
          lineHeight: 1.5,
        }}
        title={url}
      >
        {url}
      </span>
      {parsed.kind !== "invalid" ? (
        <LinkSvg style={{ width: 14, height: 14, flexShrink: 0, opacity: 0.6 }} />
      ) : null}
    </span>
  );

  if (parsed.kind === "internal") {
    return (
      <Link
        to={parsed.href}
        style={{
          display: "inline-flex",
          minWidth: 0,
          maxWidth: "100%",
          borderRadius: 6,
          padding: "4px 6px",
          color: "inherit",
          textDecoration: "none",
          transition: "background-color 0.2s",
        }}
        title={url}
      >
        {body}
      </Link>
    );
  }

  if (parsed.kind === "external" || parsed.kind === "mailto" || parsed.kind === "tel") {
    return (
      <a
        href={parsed.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          minWidth: 0,
          maxWidth: "100%",
          borderRadius: 6,
          padding: "4px 6px",
          color: "inherit",
          textDecoration: "none",
          transition: "background-color 0.2s",
        }}
        title={url}
      >
        {body}
      </a>
    );
  }

  return (
    <span
      style={{
        display: "inline-flex",
        minWidth: 0,
        maxWidth: "100%",
        borderRadius: 6,
        padding: "4px 6px",
        border: "1px dashed var(--ant-color-warning)",
        backgroundColor: "var(--ant-color-warning-bg)",
      }}
      title="请使用 http(s):// 外链或 / 开头的站内路径"
    >
      {body}
    </span>
  );
}
