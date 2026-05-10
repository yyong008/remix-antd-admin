import { relations } from "drizzle-orm";
import { foreignKey, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { account, session, user } from "./auth";

export const departments = sqliteTable(
  "sys_department",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    orderNo: integer("order_no"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
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
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const dictionaryEntries = sqliteTable("sys_dictionary_entry", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
  value: text("value").notNull(),
  orderNo: integer("order_no"),
  status: integer("status").notNull(),
  remark: text("remark"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  dictionaryId: text("dictionary_id")
    .notNull()
    .references(() => dictionaries.id),
});

export const loginLogs = sqliteTable("sys_loginlog", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ip: text("ip"),
  address: text("address"),
  loginAt: integer("login_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
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
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
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
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const menuRoles = sqliteTable("sys_menu_role", {
  id: text("id").primaryKey(),
  roleId: text("role_id")
    .notNull()
    .references(() => roles.id),
  menuId: text("menu_id")
    .notNull()
    .references(() => menus.id),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const userRoles = sqliteTable("sys_user_role", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  roleId: text("role_id")
    .notNull()
    .references(() => roles.id),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
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

export const sysConfig = sqliteTable("sys_config", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  key: text("key").notNull(),
  value: text("value").notNull(),
  description: text("description"),
  remark: text("remark"),
  type: integer("type"),
  status: integer("status"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});