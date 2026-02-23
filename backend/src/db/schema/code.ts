import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const code = pgTable("code", {
    id: uuid("id").primaryKey(),
    code: text("code"),
    userId: uuid("user_id").references(() => users.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})