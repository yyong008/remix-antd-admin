import { catchError, delay, of } from "rxjs";
import { roles } from "~/db/role";

export const getRoles$ = () => {
  return of(roles).pipe(
    delay(20),
    catchError((error) => {
      console.log(error);
      return of();
    }),
  );
};
