import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

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
  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }),
});

export const linkRelations = relations(links, ({ one }) => ({
  category: one(linkCategories, {
    fields: [links.categoryId],
    references: [linkCategories.id],
  }),
}));

export const linkCategoryRelations = relations(linkCategories, ({ many }) => ({
  links: many(links),
}));