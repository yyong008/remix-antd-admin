import { catchError, delay, of } from "rxjs";
import { tableListDataSource, loggers } from "~/db/profile/profile.advanced";

export const getTableListDataSource$ = () => {
  return of({ tableListDataSource }).pipe(
    delay(20),
    catchError((error) => {
      console.log(error);
      return of();
    }),
  );
};

export const getLoggers$ = () => {
  return of(loggers).pipe(
    delay(20),
    catchError((error) => {
      console.log(error);
      return of();
    }),
  );
};
