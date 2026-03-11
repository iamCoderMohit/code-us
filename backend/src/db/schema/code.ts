import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { canvas } from "./canvas";

export const code = pgTable("code", {
    id: uuid("id").defaultRandom().primaryKey(),
    code: text("code"),
    createyBy: uuid("user_id").references(() => users.id).notNull(),
    canvasId: uuid("canvas_id").references(() => canvas.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})