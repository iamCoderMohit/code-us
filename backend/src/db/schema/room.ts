import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const rooms = pgTable("rooms", {
    id: uuid("id").defaultRandom().primaryKey(),
    inviteCode: text("invite_code").notNull().unique(),
    ownerId: uuid("owner_id").references(() => users.id),
    member: uuid("member").references(() => users.id),
    inRoom: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull()
})