import { defaultLang } from "@/config";
import i18n from "@/libs/i18n/i18next.server";
import { menuDAL } from "@/dals/system/MenuDAL";

/**
 * 构建菜单树
 * @param menuData
 * @param parentId
 * @param t
 * @param lang
 * @returns
 */
function buildMenuTreeRaw(
  menuData: any[],
  parentId = null,
  t: (v: string) => void,
  lang: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  return menuData
    .filter((menu) => menu.parent_menu_id === parentId)
    .map((menu) => {
      const _menus = {
        ...menu,
        name: t(menu.name),
        title: t(menu.name),
        hideInMenu: !!menu.isShow,
      };
      const children = buildMenuTreeRaw(menuData, menu.id, t, lang);
      if (children.length > 0) {
        _menus.children = children;
      }

      return _menus;
    })
    .sort((a, b) => a.orderNo - b.orderNo);
}

class MenuService {
  /**
   * 菜单列表转换成树结构
   * @param data
   * @param t
   * @param lang
   * @returns
   */
  listToTree(data: any, t: any, lang: any) {
    return {
      ...data,
      list: buildMenuTreeRaw(data.list, null, t, lang),
    };
  }

  /**
   * 获取菜单列表
   * @param args
   * @returns
   */
  async getMenuTree(args: any) {
    const { lang } = args.params;
    const t = await i18n.getFixedT(lang! || defaultLang);

    const total = await menuDAL.getCount();
    const list = (await menuDAL.getAll()) ?? [];
    const data = {
      total,
      list,
    };
    console.log("xxdata", list.length);
    const result = this.listToTree(data, t, lang);
    return result;
  }
}

export const menuService = new MenuService();
