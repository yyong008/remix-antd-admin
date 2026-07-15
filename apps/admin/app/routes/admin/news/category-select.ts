export function isNewsCategoryVisible(visible: unknown): boolean {
  return visible !== false && visible !== 0 && visible !== "0";
}

export function categoriesForNewsSelect(
  raw: Array<{ id: string; name: string; visible?: unknown }> | undefined,
  activeCategoryId?: string,
) {
  const list = raw ?? [];
  const shown = list.filter((c) => isNewsCategoryVisible(c.visible));
  if (activeCategoryId) {
    const cur = list.find((c) => c.id === activeCategoryId);
    if (cur && !shown.some((c) => c.id === activeCategoryId)) {
      return [...shown, cur];
    }
  }
  return shown;
}
