import { of, delay } from "rxjs";

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    date: "1999-10-01",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    date: "1990-10-07",
  },
];

export const getExcelDisease$ = () => {
  return of({ dataSource }).pipe(delay(20));
};
