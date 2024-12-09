// import { type ActionFunctionArgs } from "@remix-run/node";
// import { lastValueFrom } from "rxjs";
// import {
//   ERRIR_USER_DISABLED,
//   ERROR_PASSWWORD,
//   ERROR_UNREGISTER,
// } from "~/constants/error";
// import {} from "@/utils/server/"
// import { bcryptUtil } from "~/utils/server/bcrypt.util";

// async function matchPassword(dataDto: any, user: any) {
//   const isMatch = bcryptUtil.comparePassword(dataDto.password, user!.password);
//   if (!isMatch) throw Error(ERROR_PASSWWORD);
//   return isMatch;
// }

// async function findUserByName(dataDto: any) {
//   const user = await lastValueFrom(bcryptUtil.findByUserName$(dataDto.username));
//   if (!user) throw Error(ERROR_UNREGISTER);
//   if (user.status === 1) throw Error(ERRIR_USER_DISABLED);
//   return user;
// }

// async function recordLoginLog(args: ActionFunctionArgs, user: any) {
//   try {
//     const loginLog = await getLoginInfo(args.request);
//     createLoginLog({
//       ...loginLog,
//       name: user!.name,
//       userId: user!.id,
//     });
//   } catch (error) {
//     console.error("❌ >> login record login log: ", error);
//   }
// }

// function signToken(userId: number) {
//   return encrypt({ userId }, "15m");
// }

// export async function register(args: ActionFunctionArgs) {
//   const vDto = await args.request.json();
//   const user: any = await findUserByName(vDto);
//   matchPassword(vDto, user);
//   await recordLoginLog(args, user);
//   return {
//     token: signToken(user.id),
//   };
// }
