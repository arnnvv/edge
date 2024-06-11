import { sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: integer("id").notNull().primaryKey(),
});
