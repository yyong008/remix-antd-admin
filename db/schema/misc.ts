import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const changeLogs = sqliteTable("change_log", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  publishName: text("publish_name").notNull(),
  publishVersion: text("publish_version").notNull(),
  publishTime: integer("publish_time", { mode: "timestamp_ms" }).notNull(),
  type: integer("type").notNull(),
  content: text("content").notNull(),
  url: text("url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const feedbacks = sqliteTable("feed_back", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  content: text("content").notNull(),
  url: text("url"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
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
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const userSignLogs = sqliteTable("user_sign_log", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  signType: integer("sign_type").notNull(),
  signTime: integer("sign_time", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
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
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
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
