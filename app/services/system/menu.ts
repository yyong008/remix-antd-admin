// type
import type { Prisma } from "@prisma/client";

// service
import prisma from "~/services/common/db.server";

// constants
import { ADMIN_ROUTE_PREFIX } from "~/constants";

// 构建菜单树的函数
function buildMenuTree(
  menuData: any[],
  parentId = null,
  t: (v: string) => void,
  lang: string,
) {
  const menuTree: any[] = [];

  menuData.forEach((menu) => {
    menu.name = t(menu.name);
    menu.key = t(menu.name);
    menu.hideInMenu = !!menu.isShow;

    if (menu.type === 3) return;

    if (!menu.isLink && !menu.path.startsWith("/" + lang)) {
      menu.path = `/${lang}/${ADMIN_ROUTE_PREFIX}${menu.path}`;
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

function buildMenuTreeRaw(
  menuData: any[],
  parentId = null,
  t: (v: string) => void,
  lang: string,
) {
  const menuTree: any[] = [];

  menuData.forEach((menu) => {
    menu.name = t(menu.name);
    menu.key = t(menu.name);
    if (menu.parent_menu_id === parentId) {
      const subMenus = buildMenuTreeRaw(menuData, menu.id, t, lang);
      if (subMenus.length) {
        menu.children = subMenus;
      }
      menuTree.push(menu);
    }
  });

  return menuTree;
}

export async function getMenu(t: () => void, lang: string) {
  try {
    const menuData = await prisma.menu.findMany();
    const menuTree = buildMenuTree(menuData, null, t, lang);
    return menuTree;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMenuRaw(t: () => void, lang: string) {
  try {
    const menuData = await prisma.menu.findMany();
    const menuTree = buildMenuTreeRaw(menuData, null, t, lang);
    return menuTree;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTypeNotPermMenu(t: () => void, lang: string) {
  try {
    const menuData = await prisma.menu.findMany({
      where: {
        type: {
          not: 3, // remove 3 is permission
        },
      },
    });

    const menuTree = buildMenuTree(menuData, null, t, lang);
    return menuTree;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 *
 * @param t 翻译函数
 * @param lang 语言
 * @param userId 菜单关联的角色
 * @returns 菜单
 */
export async function getMenuByUserId(
  userId: number,
  t: (v: string) => string,
  lang: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        UserRole: {
          include: {
            roles: {
              include: {
                MenuRole: {
                  include: {
                    menus: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // 指定角色的菜单
    const flatRoleMenuData =
      user?.UserRole?.map((_role) => {
        return _role.roles;
      })
        ?.map((role) => role.MenuRole)
        ?.reduce((p, c) => p.concat(c), [])
        ?.map((m) => m.menus)
        .map((m) => {
          m.name = t(m.name);
          return m;
        }) ?? [];

    const menuTree = buildMenuTree(
      [...new Set(flatRoleMenuData)],
      null,
      t,
      lang,
    );
    return menuTree;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMenuByUserIdNoPerm(
  t: () => void,
  lang: string,
  userId: number,
) {
  try {
    const menuData = await prisma.menu.findMany({
      where: {
        id: userId,
        type: {
          not: 3, // remove 3 is permission
        },
      },
    });

    const menuTree = buildMenuTree(menuData, null, t, lang);
    return menuTree;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 创建菜单
export const createMenu = async (data: Prisma.MenuUncheckedCreateInput) => {
  let menuData: Prisma.MenuUncheckedCreateInput;
  if (data.type === 1) {
    menuData = {
      type: data.type,
      name: data.name,
      parent_menu_id: data.parent_menu_id,
      permission: data.permission,
      isLink: data.isLink,
      isShow: data.isShow,
      path: data.path,
      path_file: data.path_file,
      status: data.status,
      orderNo: data.orderNo,
      description: data.description,
      remark: data.remark,
      icon: data.icon,
    };
  } else if (data.type === 2) {
    menuData = {
      type: data.type,
      name: data.name,
      parentId: data.parentId,
      permission: data.permission,
      isLink: data.isLink,
      isShow: data.isShow,
      path: data.path,
      path_file: data.path_file,
      status: data.status,
      orderNo: data.orderNo,
      description: data.description,
      remark: data.remark,
      icon: data.icon,
    };
  } else if (data.type === 3) {
    menuData = {
      type: data.type,
      name: data.name,
      parentId: data.parentId,
      permission: data.permission,
      status: data.status,
      orderNo: data.orderNo,
    };
  }
  try {
    const menu = await prisma.menu.create({
      data: { ...menuData },
    });

    return menu;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateMenu = async (data) => {
  try {
    const menu = await prisma.menu.update({
      where: {
        id: data.id,
      },
      data: {
        type: data.type,
        name: data.name,
        parentId: data.parentId,
        permission: data.permission,
        isLink: data.isLink,
        isShow: data.isShow,
        path: data.path,
        path_file: data.path_file,
        status: data.status,
        orderNo: data.orderNo,
      },
    });

    return menu;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteMenu = async (ids: number[]) => {
  try {
    const menu = await prisma.menu.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return menu;
  } catch (error) {
    console.error(error);
    return null;
  }
};
