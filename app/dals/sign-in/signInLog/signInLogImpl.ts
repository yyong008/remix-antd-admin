// serverUtils
import * as serverUtils from "~/utils/server";

// types
import type { IUserSignInLog } from "./signInLog.type";
// rxjs
import { from } from "rxjs";
// prisma
import prisma from "../../../libs/prisma";

const createUserSignInLog$ = (data: any) => {
  return from(prisma.userSignLog.create({ data }));
};

const getUserTodayIsSignInById$: IUserSignInLog["getUserTodayIsSignInById$"] = (
  id: number,
) => {
  const { startTime, endTime } = serverUtils.getTodayTime();

  return from(
    prisma.userSignLog.findFirst({
      where: {
        userId: id,
        signTime: {
          gte: startTime,
          lte: endTime,
        },
      },
    }),
  );
};

export { createUserSignInLog$, getUserTodayIsSignInById$ };

export class SignInLog {
  async createUserSignInLog(data: any) {
    return await prisma.userSignLog.create({ data });
  }
  async getUserTodayUserSignLogById(id: number) {
    const { startTime, endTime } = serverUtils.getTodayTime();

    return await prisma.userSignLog.findFirst({
      where: {
        userId: id,
        signTime: {
          gte: startTime,
          lte: endTime,
        },
      },
    });
  }
}

export const signInLog = new SignInLog();
