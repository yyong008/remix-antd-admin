export function isQuillBodyEmpty(html: string): boolean {
  if (!html) return true;
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, "")
    .replace(/\s+/g, "")
    .trim();
  return text.length === 0;
}
