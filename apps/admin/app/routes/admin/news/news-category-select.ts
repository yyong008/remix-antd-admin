/** 分类在列表/侧栏等处的展示开关（库内可能为 boolean 或 0/1） */
export function isNewsCategoryVisible(visible: unknown): boolean {
  return visible !== false && visible !== 0 && visible !== "0";
}

/**
 * 新建/选分类：默认只列出「展示」的分类；编辑时若当前分类已隐藏，仍保留在选项中以免无法保存。
 */
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
