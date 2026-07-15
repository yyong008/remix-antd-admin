export function isBodyEmpty(html: string) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length === 0;
}

export function buildNewsPayload(values: Record<string, unknown>, content: string) {
  const { date, ...rest } = values;
  let publishedAt: unknown = date;
  if (date && typeof date === "object" && date !== null && "valueOf" in date) {
    publishedAt = (date as { valueOf: () => number }).valueOf();
  }
  return { ...rest, content, publishedAt };
}
