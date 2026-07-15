import { Tag } from "antd";
import { Link } from "react-router";
import { LinkSvg } from "./link-svg";
import { m } from "~/paraglide/messages";
import { parseLinkUrl } from "~/utils/link-url";

type Props = {
  url: string;
};

/**
 * External links open in a new tab; in-app paths use SPA Link to avoid
 * `<a target="_blank">` accidentally catching internal routes.
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
          {m.profile_link_url_internal()}
        </Tag>
      ) : parsed.kind === "invalid" ? (
        <Tag color="default" style={{ margin: 0, flexShrink: 0 }}>
          {m.profile_link_url_invalid()}
        </Tag>
      ) : (
        <Tag color="cyan" style={{ margin: 0, flexShrink: 0 }}>
          {m.profile_link_url_external()}
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
      title={m.profile_link_url_invalid_hint()}
    >
      {body}
    </span>
  );
}
