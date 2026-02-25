import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { code } from "./code";
import { users } from "./users";

export const canvas = pgTable("canvas", {
    id: uuid("id").defaultRandom().primaryKey(),
    codeSnippet: uuid("code_id").references(() => code.id),
    user: uuid("user_id").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow()
})