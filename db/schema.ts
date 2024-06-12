import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chat = sqliteTable("chats", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Chat = typeof chat.$inferSelect;

export const message = sqliteTable("messages", {
  id: integer("id").notNull().primaryKey(),
  chatId: text("chat_id")
    .notNull()
    .references(() => chat.id),
  role: text("role", { enum: ["user", "assistant"] }).notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Message = typeof message.$inferSelect;
