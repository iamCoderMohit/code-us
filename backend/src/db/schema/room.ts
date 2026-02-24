import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const rooms = pgTable("rooms", {
    id: uuid("id").primaryKey(),
    inviteCode: text("invite_code").notNull().unique(),
    ownerId: uuid("owner_id").references(() => users.id),
    member: uuid("member").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull()
})