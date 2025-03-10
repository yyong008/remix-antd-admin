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
  t: (v: string) => string,
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

/**
 * 菜单列表转换成树结构
 * @param data
 * @param t
 * @param lang
 * @returns
 */
function listToTree(data: any, t: any, lang: any) {
  return {
    ...data,
    list: buildMenuTreeRaw(data.list, null, t, lang),
  };
}

class MenuService {
  /**
   * 获取菜单列表
   */
  async getMenuList() {
    const total = await menuDAL.getCount();
    const list = (await menuDAL.getAll()) ?? [];
    return {
      total,
      list,
    };
  }
  /**
   * 获取菜单tree list
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
    const result = listToTree(data, t, lang);
    return result;
  }

  /**
   * 创建菜单
   * @param args
   * @returns
   */
  async create(args: any) {
    const dto = await args.request.json();
    if (dto.parent_menu_id < 0) {
      dto.parent_menu_id = null;
    }
    const result = await menuDAL.create(dto);
    return result;
  }

  /**
   * 更新菜单
   * @param args
   * @returns
   */
  async update(args: any) {
    const dto = await args.request.json();
    if (dto.parent_menu_id < 0) {
      dto.parent_menu_id = null;
    }
    const result = await menuDAL.update(dto);
    return result;
  }

  /**
   * 根据ids删除菜单
   * @param args
   * @returns
   */
  async delete(args: any) {
    const { ids } = await args.request.json();
    const result = await menuDAL.deleteByIds(ids);
    return result;
  }
}

export const menuService = new MenuService();
