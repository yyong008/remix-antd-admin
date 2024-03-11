import { delay, of } from "rxjs";

import { treeData, treeDataAdmin, treeDataUser } from "../../db/menu/index";

export const getMenuData$ = () => {
  return of({ treeData, treeDataAdmin, treeDataUser }).pipe(delay(20));
};
