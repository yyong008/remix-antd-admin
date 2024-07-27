import type { TreeDataNode } from "antd";
import { from } from "rxjs";
import prisma from "~/libs/prisma";

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

// menuRole
export const readAllMenuRoleList$ = () => from(prisma.menuRole.findMany());

// --------------------------- menu
const permMenuType = 3;

export const readAllMenuListFilterPermMenuType$ = () =>
  from(
    prisma.menu.findMany({
      where: {
        type: {
          not: permMenuType,
        },
      },
    }),
  );
