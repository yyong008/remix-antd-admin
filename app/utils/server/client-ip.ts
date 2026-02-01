const headerCandidates = [
  "cf-connecting-ip",
  "cf-connecting-ipv6",
  "x-forwarded-for",
  "x-real-ip",
  "true-client-ip",
  "x-client-ip",
  "x-forwarded",
  "forwarded",
];

function cleanIp(value: string) {
  const v = value.trim();
  if (!v || v.toLowerCase() === "unknown") return null;
  if (v.startsWith("[")) {
    const end = v.indexOf("]");
    return end > 0 ? v.slice(1, end) : v;
  }
  const colonIndex = v.lastIndexOf(":");
  if (colonIndex > 0 && v.indexOf(".") !== -1) {
    return v.slice(0, colonIndex);
  }
  return v;
}

function pickFromForwarded(forwarded: string) {
  const match = forwarded.match(/for="?([^;,"\s]+)/i);
  return match ? cleanIp(match[1]) : null;
}

function getHeaderValue(
  headers: Headers | Record<string, string | string[] | null | undefined>,
  name: string,
) {
  if (headers instanceof Headers) {
    return headers.get(name);
  }
  const value = headers[name];
  if (Array.isArray(value)) return value.join(",");
  return value ?? null;
}

export function getClientIPAddress(
  headers: Headers | Record<string, string | string[] | null | undefined>,
) {
  for (const name of headerCandidates) {
    const raw = getHeaderValue(headers, name);
    if (!raw) continue;
    if (name === "forwarded") {
      const forwardedIp = pickFromForwarded(raw);
      if (forwardedIp) return forwardedIp;
      continue;
    }
    const first = raw.split(",").map((part) => part.trim()).find(Boolean);
    const cleaned = first ? cleanIp(first) : null;
    if (cleaned) return cleaned;
  }
  return null;
}
