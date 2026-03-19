import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { rooms } from "./room";
import { relations } from "drizzle-orm";

export const members = pgTable("members", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id),
    roomId: uuid("room_id").references(() => rooms.id),
    isActive: boolean("is_active").default(false),
    createdAt: timestamp("created_at").defaultNow()
})

export const memberRelations = relations(members, ({one}) => ({
    owner: one(users, {
        fields: [members.userId],
        references: [users.id]
    })
}))