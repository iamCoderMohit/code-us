import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { canvas } from "./canvas";
import { users } from "./users";

export const canvas_participants = pgTable("canvas_participants", {
    id: uuid("id").defaultRandom().primaryKey(),
    canvasId: uuid("canvas_id").references(() => canvas.id),
    userId: uuid("user_id").references(() => users.id),
    joinedAt: timestamp("joined_at").defaultNow()
})