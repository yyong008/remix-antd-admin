/**
 * 个人链接等场景：支持 `https?://` 外链、`/` 站内路径、`mailto:`、`tel:`、协议相对 `//`。
 * 不接受无协议的裸域名（避免误填）。
 */

export type ParsedLinkUrl =
  | { kind: "external"; href: string }
  | { kind: "internal"; href: string }
  | { kind: "mailto"; href: string }
  | { kind: "tel"; href: string }
  | { kind: "invalid"; href: string; reason: string };

const TRIM = (s: string) => s.trim();

export function parseLinkUrl(raw: string): ParsedLinkUrl {
  const s = TRIM(raw);
  if (!s) {
    return { kind: "invalid", href: s, reason: "empty" };
  }

  const lower = s.toLowerCase();
  if (lower.startsWith("mailto:")) {
    return { kind: "mailto", href: s };
  }
  if (lower.startsWith("tel:")) {
    return { kind: "tel", href: s };
  }
  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    return { kind: "external", href: s };
  }
  if (s.startsWith("//")) {
    return { kind: "external", href: s };
  }
  if (s.startsWith("/") && !s.startsWith("//")) {
    return { kind: "internal", href: s };
  }

  return {
    kind: "invalid",
    href: s,
    reason: "bare",
  };
}

export function isValidLinkUrl(raw: string): boolean {
  return parseLinkUrl(raw).kind !== "invalid";
}

export const linkUrlRuleMessage =
  "请填写以 http:// 或 https:// 开头的外部链接，或以 / 开头的站内路径（也可使用 mailto:、tel:）";
