import { from } from "rxjs";
import prisma from "@/libs/prisma";

export const getAccountById$ = (id: number) => {
  console.log("id", id);
  return from(
    prisma.user.findUnique({
      where: {
        id,
      },
    }),
  );
};
