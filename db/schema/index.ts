import {
  integer,
  foreignKey,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const blogCategories = pgTable("blog_category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  userId: integer("user_id").notNull(),
});

export const blogTags = pgTable("blog_tag", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  userId: integer("user_id").notNull(),
});

export const blogs = pgTable("blog", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author"),
  source: text("source"),
  viewCount: integer("viewCount").notNull().default(0),
  publishedAt: timestamp("publishedAt", { mode: "date" }).notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => blogCategories.id),
  tagId: integer("tag_id").notNull().references(() => blogTags.id),
  userId: integer("user_id").notNull(),
});

export const changeLogs = pgTable("change_log", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  publishName: text("publish_name").notNull(),
  publishVersion: text("publish_version").notNull(),
  publishTime: timestamp("publish_time", { mode: "date" }).notNull(),
  type: integer("type").notNull(),
  content: text("content").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const feedbacks = pgTable("feed_back", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  content: text("content").notNull(),
  url: text("url"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const mails = pgTable("mail", {
  id: serial("id").primaryKey(),
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

export const newsCategories = pgTable("news_category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  userId: integer("user_id").notNull(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author"),
  source: text("source"),
  viewCount: integer("viewCount").notNull().default(0),
  publishedAt: timestamp("publishedAt", { mode: "date" }).notNull(),
  newsId: integer("news_id").notNull().references(() => newsCategories.id),
  userId: integer("user_id").notNull(),
});

export const operates = pgTable("Operate", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  username: text("username"),
  path: text("path").notNull(),
  url: text("url").notNull(),
  method: text("method").notNull(),
  ipAddress: text("ip_address"),
  statusCode: integer("status_code").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),
});

export const linkCategories = pgTable("profile_link_category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: integer("user_id").notNull(),
});

export const links = pgTable("profile_link", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  description: text("description"),
  categoryId: integer("category_id")
    .notNull()
    .references(() => linkCategories.id),
  userId: integer("user_id").notNull(),
});

export const departments = pgTable(
  "sys_department",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    orderNo: integer("order_no"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
    parentDepartmentId: integer("parent_department_id"),
  },
  (table) => ({
    parentDepartmentFk: foreignKey({
      columns: [table.parentDepartmentId],
      foreignColumns: [table.id],
      name: "sys_department_parent_fk",
    }).onDelete("set null"),
  }),
);

export const dictionaries = pgTable("sys_dictionary", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  description: text("description"),
  remark: text("remark"),
  status: integer("status"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const dictionaryEntries = pgTable("sys_dictionary_entry", {
  id: serial("id").primaryKey(),
  key: text("key").notNull(),
  value: text("value").notNull(),
  orderNo: integer("order_no"),
  status: integer("status").notNull(),
  remark: text("remark"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
  dictionaryId: integer("dictionary_id")
    .notNull()
    .references(() => dictionaries.id),
});

export const loginLogs = pgTable("sys_loginlog", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ip: text("ip"),
  address: text("address"),
  loginAt: timestamp("login_at", { mode: "date" }).notNull().defaultNow(),
  system: text("system"),
  browser: text("browser"),
  userId: integer("userId").notNull(),
});

export const menus = pgTable(
  "sys_menu",
  {
    id: serial("id").primaryKey(),
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
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
    parentMenuId: integer("parent_menu_id"),
  },
  (table) => ({
    parentMenuFk: foreignKey({
      columns: [table.parentMenuId],
      foreignColumns: [table.id],
      name: "sys_menu_parent_fk",
    }).onDelete("set null"),
  }),
);

export const roles = pgTable("sys_role", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  description: text("description"),
  remark: text("remark"),
  status: integer("status"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const menuRoles = pgTable("sys_menu_role", {
  id: serial("id").primaryKey(),
  roleId: integer("role_id").notNull().references(() => roles.id),
  menuId: integer("menu_id").notNull().references(() => menus.id),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const users = pgTable("sys_user", {
  id: serial("id").primaryKey(),
  avatar: text("avatar"),
  email: text("email"),
  name: text("name").notNull(),
  nickname: text("nickname"),
  password: text("password").notNull(),
  lang: text("lang").notNull().default("en-US"),
  theme: text("theme").notNull().default("light"),
  phone: text("phone"),
  remark: text("remark"),
  status: integer("status"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
  departmentId: integer("department_id").references(() => departments.id, {
    onDelete: "cascade",
  }),
});

export const userRoles = pgTable("sys_user_role", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  roleId: integer("role_id").notNull().references(() => roles.id),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const userSignLogs = pgTable("user_sign_log", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  signType: integer("sign_type").notNull(),
  signTime: timestamp("sign_time", { mode: "date" }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const userSigns = pgTable("user_sign", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  resignNums: integer("resign_nums").notNull(),
  signedNums: integer("signed_nums").notNull(),
  continuitySignedNums: integer("continuity_signed_nums").notNull(),
});

export const storages = pgTable("tools_storage", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  fileName: text("file_name").notNull(),
  extName: text("ext_name").notNull(),
  path: text("path").notNull(),
  size: text("size").notNull(),
  type: text("type").notNull(),
});

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

export const departmentRelations = relations(
  departments,
  ({ one, many }) => ({
    parent: one(departments, {
      fields: [departments.parentDepartmentId],
      references: [departments.id],
      relationName: "department_parent",
    }),
    children: many(departments, { relationName: "department_parent" }),
    users: many(users),
  }),
);

export const dictionaryRelations = relations(dictionaries, ({ many }) => ({
  entries: many(dictionaryEntries),
}));

export const dictionaryEntryRelations = relations(
  dictionaryEntries,
  ({ one }) => ({
    dictionary: one(dictionaries, {
      fields: [dictionaryEntries.dictionaryId],
      references: [dictionaries.id],
    }),
  }),
);

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

export const userRelations = relations(users, ({ one, many }) => ({
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
  userRoles: many(userRoles),
}));

export const userRoleRelations = relations(userRoles, ({ one }) => ({
  user: one(users, { fields: [userRoles.userId], references: [users.id] }),
  role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));
