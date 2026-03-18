import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const rooms = pgTable("rooms", {
    id: uuid("id").defaultRandom().primaryKey(),
    inviteCode: text("invite_code").notNull().unique(),
    ownerId: uuid("owner_id").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull()
})

export const roomRelations = relations(rooms, ({one}) => ({
    owner: one(users, {
        fields: [rooms.ownerId],
        references: [users.id]
    })
}))