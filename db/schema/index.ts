import { index, integer, foreignKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const blogCategories = sqliteTable("blog_category", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const blogTags = sqliteTable("blog_tag", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const blogs = sqliteTable("blog", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author"),
  source: text("source"),
  viewCount: integer("viewCount").notNull().default(0),
  publishedAt: text("publishedAt").notNull(),
  categoryId: text("category_id")
    .notNull()
    .references(() => blogCategories.id),
  tagId: text("tag_id")
    .notNull()
    .references(() => blogTags.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const changeLogs = sqliteTable("change_log", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  publishName: text("publish_name").notNull(),
  publishVersion: text("publish_version").notNull(),
  publishTime: text("publish_time").notNull(),
  type: integer("type").notNull(),
  content: text("content").notNull(),
  url: text("url").notNull(),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt"),
});

export const feedbacks = sqliteTable("feed_back", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  content: text("content").notNull(),
  url: text("url"),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt"),
});

export const mails = sqliteTable("mail", {
  id: text("id").primaryKey(),
  name: text("name"),
  title: text("title"),
  host: text("host"),
  port: integer("port"),
  user: text("user"),
  pass: text("pass"),
  from: text("from"),
  to: text("to"),
  subject: text("subject"),
  content: text("content"),
  html: text("html"),
  text: text("text"),
});

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  nickname: text("nickname"),
  avatar: text("avatar"),
  locale: text("locale").notNull().default("en-US"),
  theme: text("theme").notNull().default("light"),
  phone: text("phone"),
  remark: text("remark"),
  status: integer("status"),
  departmentId: integer("department_id"),
  createdAt: text("created_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updatedAt: text("updated_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  role: text("role"),
  banned: integer("banned", { mode: "boolean" }),
  banReason: text("ban_reason"),
  banExpires: text("ban_expires"),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: text("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: text("access_token_expires_at"),
  refreshTokenExpiresAt: text("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const newsCategories = sqliteTable("news_category", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const news = sqliteTable("news", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author"),
  source: text("source"),
  viewCount: integer("viewCount").notNull().default(0),
  publishedAt: text("publishedAt").notNull(),
  newsId: text("news_id")
    .notNull()
    .references(() => newsCategories.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const operates = sqliteTable("Operate", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  username: text("username"),
  path: text("path").notNull(),
  url: text("url").notNull(),
  method: text("method").notNull(),
  ipAddress: text("ip_address"),
  statusCode: integer("status_code").notNull(),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull(),
});

export const linkCategories = sqliteTable("profile_link_category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const links = sqliteTable("profile_link", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  description: text("description"),
  categoryId: text("category_id")
    .notNull()
    .references(() => linkCategories.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const departments = sqliteTable(
  "sys_department",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    orderNo: integer("order_no"),
    createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
    updatedAt: text("updatedAt"),
    parentDepartmentId: text("parent_department_id"),
  },
  (table) => ({
    parentDepartmentFk: foreignKey({
      columns: [table.parentDepartmentId],
      foreignColumns: [table.id],
      name: "sys_department_parent_fk",
    }).onDelete("set null"),
  }),
);

export const dictionaries = sqliteTable("sys_dictionary", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  description: text("description"),
  remark: text("remark"),
  status: integer("status"),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt"),
});

export const dictionaryEntries = sqliteTable("sys_dictionary_entry", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
  value: text("value").notNull(),
  orderNo: integer("order_no"),
  status: integer("status").notNull(),
  remark: text("remark"),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt"),
  dictionaryId: text("dictionary_id")
    .notNull()
    .references(() => dictionaries.id),
});

export const loginLogs = sqliteTable("sys_loginlog", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ip: text("ip"),
  address: text("address"),
  loginAt: text("login_at").notNull().default("CURRENT_TIMESTAMP"),
  system: text("system"),
  browser: text("browser"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const menus = sqliteTable(
  "sys_menu",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    type: integer("type").notNull(),
    description: text("description"),
    remark: text("remark"),
    icon: text("icon"),
    path: text("path"),
    pathFile: text("path_file"),
    status: integer("status"),
    isShow: integer("isShow"),
    isCache: integer("isCache"),
    permission: text("permission"),
    isLink: integer("isLink"),
    orderNo: integer("order_no"),
    createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
    updatedAt: text("updatedAt"),
    parentMenuId: text("parent_menu_id"),
  },
  (table) => ({
    parentMenuFk: foreignKey({
      columns: [table.parentMenuId],
      foreignColumns: [table.id],
      name: "sys_menu_parent_fk",
    }).onDelete("set null"),
  }),
);

export const roles = sqliteTable("sys_role", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  description: text("description"),
  remark: text("remark"),
  status: integer("status"),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt"),
});

export const menuRoles = sqliteTable("sys_menu_role", {
  id: text("id").primaryKey(),
  roleId: text("role_id")
    .notNull()
    .references(() => roles.id),
  menuId: text("menu_id")
    .notNull()
    .references(() => menus.id),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt"),
});

export const userRoles = sqliteTable("sys_user_role", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  roleId: text("role_id")
    .notNull()
    .references(() => roles.id),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt"),
});

export const userSignLogs = sqliteTable("user_sign_log", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  signType: integer("sign_type").notNull(),
  signTime: text("sign_time").notNull(),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt"),
});

export const userSigns = sqliteTable("user_sign", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  resignNums: integer("resign_nums").notNull(),
  signedNums: integer("signed_nums").notNull(),
  continuitySignedNums: integer("continuity_signed_nums").notNull(),
});

export const storages = sqliteTable("tools_storage", {
  id: text("id").primaryKey(),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  fileName: text("file_name").notNull(),
  extName: text("ext_name").notNull(),
  path: text("path").notNull(),
  size: text("size").notNull(),
  type: text("type").notNull(),
});

export const authUserRelations = relations(user, ({ many, one }) => ({
  accounts: many(account),
  sessions: many(session),
  userRoles: many(userRoles),
  department: one(departments, {
    fields: [user.departmentId],
    references: [departments.id],
  }),
}));

export const authAccountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const authSessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const blogRelations = relations(blogs, ({ one }) => ({
  category: one(blogCategories, {
    fields: [blogs.categoryId],
    references: [blogCategories.id],
  }),
  tag: one(blogTags, { fields: [blogs.tagId], references: [blogTags.id] }),
}));

export const blogCategoryRelations = relations(blogCategories, ({ many }) => ({
  blogs: many(blogs),
}));

export const blogTagRelations = relations(blogTags, ({ many }) => ({
  blogs: many(blogs),
}));

export const newsRelations = relations(news, ({ one }) => ({
  category: one(newsCategories, {
    fields: [news.newsId],
    references: [newsCategories.id],
  }),
}));

export const newsCategoryRelations = relations(newsCategories, ({ many }) => ({
  news: many(news),
}));

export const linkRelations = relations(links, ({ one }) => ({
  category: one(linkCategories, {
    fields: [links.categoryId],
    references: [linkCategories.id],
  }),
}));

export const linkCategoryRelations = relations(linkCategories, ({ many }) => ({
  links: many(links),
}));

export const departmentRelations = relations(departments, ({ one, many }) => ({
  parent: one(departments, {
    fields: [departments.parentDepartmentId],
    references: [departments.id],
    relationName: "department_parent",
  }),
  children: many(departments, { relationName: "department_parent" }),
  users: many(user),
}));

export const dictionaryRelations = relations(dictionaries, ({ many }) => ({
  entries: many(dictionaryEntries),
}));

export const dictionaryEntryRelations = relations(dictionaryEntries, ({ one }) => ({
  dictionary: one(dictionaries, {
    fields: [dictionaryEntries.dictionaryId],
    references: [dictionaries.id],
  }),
}));

export const menuRelations = relations(menus, ({ one, many }) => ({
  parent: one(menus, {
    fields: [menus.parentMenuId],
    references: [menus.id],
    relationName: "menu_parent",
  }),
  children: many(menus, { relationName: "menu_parent" }),
  menuRoles: many(menuRoles),
}));

export const menuRoleRelations = relations(menuRoles, ({ one }) => ({
  menu: one(menus, { fields: [menuRoles.menuId], references: [menus.id] }),
  role: one(roles, { fields: [menuRoles.roleId], references: [roles.id] }),
}));

export const roleRelations = relations(roles, ({ many }) => ({
  menuRoles: many(menuRoles),
  userRoles: many(userRoles),
}));

export const userRoleRelations = relations(userRoles, ({ one }) => ({
  user: one(user, { fields: [userRoles.userId], references: [user.id] }),
  role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));
