import { from, map, of, switchMap } from "rxjs";

import type { Prisma } from "@prisma/client";
import prisma from "~/libs/prisma";
import { treeData } from "~/__mock__/db/menu";

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

    if (!menu.isLink && !menu.path?.startsWith("/" + lang)) {
      menu.path = `/${lang}/admin${menu.path}`;
    }

    if (menu.parent_menu_id === parentId) {
      const subMenus = buildMenuTree(menuData, menu.id, t, lang);
      if (subMenus.length) {
        menu.children = subMenus;
      }
      menuTree.push(menu);
    }
  });
  return treeData;
}

function buildMenuTreeRaw(
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

export async function getFlatMenuByUserId(
  userId: number,
  t: (v: string) => string,
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

    const flatRoleMenuData =
      user?.UserRole?.map(({ roles }) => roles)
        ?.map((role) => role.MenuRole)
        ?.reduce((p, c) => p.concat(c), [])
        ?.map((m) => m.menus)
        .map((m) => {
          m.name = t(m.name);
          return m;
        })
        .filter((item) => item.type !== 3) ?? [];

    return [...new Set(flatRoleMenuData)];
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
  } else {
    menuData = {
      type: data.type,
      name: data.name,
      parent_menu_id: data.parent_menu_id,
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

export const updateMenu = async (data: Prisma.MenuUncheckedUpdateInput) => {
  try {
    const menu = await prisma.menu.update({
      where: {
        id: data.id as number,
      },
      data: {
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

// ----
const permMenuType = 3;

export const readMenuCount$ = () => from(prisma.menu.count());
export const readAllMenuList$ = () => from(prisma.menu.findMany());
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

export const createMenu$ = (data: Prisma.MenuUncheckedCreateInput) =>
  of(data)
    .pipe(
      map((data) => {
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
        } else {
          menuData = {
            type: data.type,
            name: data.name,
            parent_menu_id: data.parent_menu_id,
            permission: data.permission,
            status: data.status,
            orderNo: data.orderNo,
          };
        }

        return menuData;
      }),
    )
    .pipe(
      switchMap((data) =>
        prisma.menu.create({
          data,
        }),
      ),
    );

export const updateMenuById$ = async (data: Prisma.MenuUncheckedUpdateInput) =>
  from(
    prisma.menu.update({
      where: {
        id: data.id as number,
      },
      data: {
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
      },
    }),
  );

export const deleteMenuByIds$ = async (ids: number[]) =>
  from(
    prisma.menu.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
