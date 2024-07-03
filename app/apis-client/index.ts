import { adminDemo } from "./admin/demo";
import { auth } from "./auth";
import { blog } from "./admin/blog/blog";
import { blogCategory } from "./admin/blog/category";
import { blogTag } from "./admin/blog/tag";
import { dashboard } from "./admin/dashboard";
import { signIn } from "./signin";
import { userInfo } from "./user-info";

export const reducers = {
  [userInfo.reducerPath]: userInfo.reducer,
  [auth.reducerPath]: auth.reducer,
  [dashboard.reducerPath]: dashboard.reducer,
  [signIn.reducerPath]: signIn.reducer,
  [adminDemo.reducerPath]: adminDemo.reducer,
  [blog.reducerPath]: blog.reducer,
  [blogCategory.reducerPath]: blogCategory.reducer,
  [blogTag.reducerPath]: blogTag.reducer,
};

export const middlewares = [
  userInfo.middleware,
  dashboard.middleware,
  auth.middleware,
  signIn.middleware,
  adminDemo.middleware,
  blog.middleware,
  blogCategory.middleware,
  blogTag.middleware,
];
