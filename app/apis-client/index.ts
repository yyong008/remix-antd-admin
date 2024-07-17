import { adminDemo } from "./admin/demo";
import { auth } from "./auth";
import { blog } from "./admin/blog/blog";
import { blogCategory } from "./admin/blog/category";
import { blogTag } from "./admin/blog/tag";
import { changelog } from "./admin/docs/changelog";
import { dashboard } from "./admin/dashboard";
import { feedback } from "./admin/docs/feedback";
import { news } from "./admin/news/news";
import { newsCategory } from "./admin/news/category";
import { profileAccount } from "./admin/profile/account";
import { profileLink } from "./admin/profile/link";
import { profileLinkCategory } from "./admin/profile/link-category";
import { signIn } from "./signin";
import { toolsStorage } from "./admin/tools/storage";
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
  [news.reducerPath]: news.reducer,
  [newsCategory.reducerPath]: newsCategory.reducer,
  [changelog.reducerPath]: changelog.reducer,
  [feedback.reducerPath]: feedback.reducer,
  [profileAccount.reducerPath]: profileAccount.reducer,
  [profileLink.reducerPath]: profileLink.reducer,
  [profileLinkCategory.reducerPath]: profileLinkCategory.reducer,
  [toolsStorage.reducerPath]: toolsStorage.reducer,
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
  news.middleware,
  newsCategory.middleware,
  changelog.middleware,
  feedback.middleware,
  profileAccount.middleware,
  profileLink.middleware,
  profileLinkCategory.middleware,
  toolsStorage.middleware,
];
