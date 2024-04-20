import type { TreeDataNode } from "antd";

// service
import prisma from "~/server/services/common/prisma";

export interface IMenuRole {
  getMenu(t: () => void, lang: string): any;
  getMenuRaw(t: () => void, lang: string): any;
  getTypeNotPermMenu(t: () => void, lang: string): any;
}

function buildMenuTree(
  menuData: any[],
  parentId = null,
  t: (v: string) => void,
  lang: string,
) {
  return menuData
    .filter((menu) => menu.parent_menu_id === parentId)
    .map((menu) => {
      const _menus = {
        ...menu,
        name: t(menu.name),
        title: t(menu.name),
        hideInMenu: !!menu.isShow,
      };
      const children = buildMenuTree(menuData, menu.id, t, lang);
      if (children.length > 0) {
        _menus.children = children;
      }

      return _menus;
    })
    .sort((a, b) => a.orderNo - b.orderNo);
}

export async function getMenuRaw(t: () => void, lang: string) {
  let menu = await prisma.menu.findMany();

  const treeData: TreeDataNode[] = buildMenuTree(menu, null, t, lang);
  return treeData;
}

/**
 * 获取所有菜单（扁平，没有处理的， 包含目录，菜单，权限）
 * @returns
 */
export async function getFlatMenu() {
  let menu = await prisma.menu.findMany();
  return menu;
}

export async function getTypeNotPermMenu(t: () => void) {
  try {
    let menuData = await prisma.menu.findMany({
      where: {
        type: {
          not: 3,
        },
      },
    });

    let menuTree = buildMenuTree(menuData, null, t, "en-US");
    return menuTree;
  } catch (error) {
    console.error(error);
    return null;
  }
}
