import prisma from "../common/db.server";

/**
 *
 * @param t 翻译函数
 * @param lang 语言
 * @param userId 菜单关联的角色
 * @returns 菜单
 */
export async function getFlatMenuByUserId(userId: number) {
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
    const flatRoleMenuData = user?.UserRole?.map(({ roles }) => roles)
      ?.map((role) => role.MenuRole)
      ?.reduce((p, c) => p.concat(c), [])
      ?.map((m) => m.menus);

    return [...new Set(flatRoleMenuData)];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getUserPerms = async (userId: number) => {
  let permissions: any[] = [];
  const menus = await getFlatMenuByUserId(userId);
  console.log("menus", menus);
  if (menus != null) {
    permissions = menus
      .filter((menu) => menu.permission)
      .map((m) => m.permission);
  }
  return permissions;
};
