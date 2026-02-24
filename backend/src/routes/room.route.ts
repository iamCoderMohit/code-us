import { Hono } from "hono";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { verifyUser } from "../middleware/auth";
import { User } from "../customTypes/user";
import { db } from "../config/drizzle";
import { rooms } from "../db/schema/room";
import { sql } from "drizzle-orm";

const app = new Hono<{Variables: {user: User}}>()

app.post("/create", verifyUser, async (c) => {
    try {
        const user = c.get("user")
        const body = await c.req.json()

        if(!body.roomCode) {
            return errorResponse(c, "Provide a unique room code")
        }

        const roomExists = await db.select().from(rooms)
                            .where(sql`${rooms.inviteCode} = ${body.roomCode}`)
        
        if(roomExists.length > 0) {
            return errorResponse(c, "Room with this code already exists")
        }
        await db.insert(rooms)
            .values({
                id: user.id,
                inviteCode: body.roomCode,
                member: user.id,
                ownerId: user.id,
            })
        return successResponse(c, {data: "room created"})
    } catch (error) {
        console.error(error)
        return errorResponse(c, "room not created")
    }
})

// route for joining an existing room
app.post("/join/:inviteCode", verifyUser, async (c) => {
    try {
        const inviteCode = c.req.param('inviteCode')

        if(!inviteCode) {
            return errorResponse(c, "Invite code missing")
        }
    } catch (error) {
        
    }
})

export default app