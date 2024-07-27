import { forkJoin, lastValueFrom, map, of, switchMap } from "rxjs";
import { getSearchParamsPage, getSearchParamsPageSize } from "@/utils/server";
import { readAllMenuList$, readMenuCount$ } from "@/dals/system/menu";

import { defaultLang } from "~/config";
import i18n from "@/libs/i18n/i18next.server";

const createOriginParams$ = (args: any) =>
  of({
    page: getSearchParamsPage(args.request),
    pageSize: getSearchParamsPageSize(args.request),
  });

const page$ = (data: any) =>
  forkJoin({
    total: readMenuCount$(),
    list: readAllMenuList$(),
  });

const listToTree$ = (data: any, t: any, lang: any) => ({
  ...data,
  list: buildMenuTreeRaw(data.list, null, t, lang),
});

// const requestDto$ = (args: any) => from(args.request.json());

// services
export const readSystemMenuListTreeService = async (args: any) => {
  const { lang } = args.params;
  const t = await i18n.getFixedT(lang! || defaultLang);

  const result$ = createOriginParams$(args)
    .pipe(switchMap(page$))
    .pipe(map((data) => listToTree$(data, t, lang)));

  return lastValueFrom(result$);
};

// function buildMenuTree(
//   menuData: any[],
//   parentId = null,
//   t: (v: string) => void,
//   lang: string,
// ) {
//   const menuTree: any[] = [];

//   menuData.forEach((menu) => {
//     menu.name = t(menu.name);
//     menu.key = t(menu.name);
//     menu.hideInMenu = !!menu.isShow;

//     if (menu.type === 3) return;

//     if (!menu.isLink && !menu.path?.startsWith("/" + lang)) {
//       menu.path = `/${lang}/admin${menu.path}`;
//     }

//     if (menu.parent_menu_id === parentId) {
//       const subMenus = buildMenuTree(menuData, menu.id, t, lang);
//       if (subMenus.length) {
//         menu.children = subMenus;
//       }
//       menuTree.push(menu);
//     }
//   });
//   return menuData;
// }

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
      const children = buildMenuTreeRaw(menuData, menu.id, t, lang);
      if (children.length > 0) {
        _menus.children = children;
      }

      return _menus;
    })
    .sort((a, b) => a.orderNo - b.orderNo);
}
