import type { TreeDataNode } from "antd";

// service
import prisma from "~/server/services/common/prisma";

function buildTreeData(
  menuData: any[],
  parentId = null,
  t: (v: string) => void,
) {
  const menuTree: any[] = [];

  menuData.forEach((menu) => {
    menu.title = t(menu.name);
    menu.name = t(menu.name);

    if (menu.parent_menu_id === parentId) {
      const subMenus = buildTreeData(menuData, menu.id, t);
      if (subMenus.length) {
        menu.children = subMenus;
      }
      menuTree.push(menu);
    }
  });

  return menuTree;
}

function buildMenuTree(
  menuData: any[],
  parentId = null,
  t: (v: string) => void,
  lang: string,
) {
  const menuTree: any[] = [];

  menuData.forEach((menu) => {
    menu.name = t(menu.name);
    menu.title = t(menu.name);
    menu.hideInMenu = !!menu.isShow;

    if (menu.type !== 3) {
      if (!menu.isLink && !menu.path.startsWith("/" + lang)) {
        menu.path = `/${lang}/admin${menu.path}`;
      }
    }

    if (menu.parent_menu_id === parentId) {
      const subMenus = buildMenuTree(menuData, menu.id, t, lang);
      if (subMenus.length) {
        menu.children = subMenus;
      }
      menuTree.push(menu);
    }
  });

  return menuTree;
}

export async function getMenuRaw(t: () => void, lang: string) {
  let menu = await prisma.menu.findMany();

  const treeData: TreeDataNode[] = buildMenuTree(menu, null, t, lang);
  return treeData;
}

export async function getFlatMenu() {
  let menu = await prisma.menu.findMany();
  return menu;
}

export async function getTypeNotPermMenu(t: () => void) {
  try {
    const menuData = await prisma.menu.findMany({
      where: {
        type: {
          not: 3,
        },
      },
    });

    const menuTree = buildTreeData(menuData, null, t);
    return menuTree;
  } catch (error) {
    console.error(error);
    return null;
  }
}
