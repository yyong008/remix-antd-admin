import { delay, of } from "rxjs";

export const roles = [
  {
    name: "super",
    key: "super",
    description: "Super Administrator. Have access to view all pages.",
    menus: [],
  },
  {
    name: "normal",
    key: "normal",
    description: "Normal user. Can see part of pages except permission page",
    menus: [],
  },
];

export const getRoles$ = () => {
  return of(roles).pipe(delay(20));
};
