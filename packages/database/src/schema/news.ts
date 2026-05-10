import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const newsCategories = sqliteTable("news_category", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
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
});

export const news = sqliteTable("news", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author"),
  source: text("source"),
  viewCount: integer("viewCount").notNull().default(0),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  newsId: text("news_id")
    .notNull()
    .references(() => newsCategories.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  status: integer("status").notNull().default(1),
});

export const newsRelations = relations(news, ({ one }) => ({
  category: one(newsCategories, {
    fields: [news.newsId],
    references: [newsCategories.id],
  }),
}));

export const newsCategoryRelations = relations(newsCategories, ({ many }) => ({
  news: many(news),
}));