import { auth } from "~/apis-client/auth";
import { dashboard } from "./dashboard";
import { signIn } from "./signin";
import { userInfo } from "./user-info";

export const reducers = {
  [userInfo.reducerPath]: userInfo.reducer,
  [auth.reducerPath]: auth.reducer,
  [dashboard.reducerPath]: dashboard.reducer,
  [signIn.reducerPath]: signIn.reducer,
};

export const middlewares = [
  userInfo.middleware,
  dashboard.middleware,
  auth.middleware,
  signIn.middleware,
];
