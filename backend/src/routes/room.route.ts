import { Hono } from "hono";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { verifyUser } from "../middleware/auth";
import { User } from "../customTypes/user";
import { db } from "../config/drizzle";
import { rooms } from "../db/schema/room";
import { and, or, sql } from "drizzle-orm";

const app = new Hono<{ Variables: { user: User } }>();

app.post("/create", verifyUser, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();

    if (!body.roomCode) {
      return errorResponse(c, "Provide a unique room code");
    }

    const roomExists = await db
      .select()
      .from(rooms)
      .where(sql`${rooms.inviteCode} = ${body.roomCode}`);

    if (roomExists.length > 0) {
      return errorResponse(c, "Room with this code already exists");
    }
    await db.insert(rooms).values({
      inviteCode: body.roomCode,
      member: user.id,
      ownerId: user.id,
      inRoom: true,
    });
    return successResponse(c, { data: "room created" });
  } catch (error) {
    console.error(error);
    return errorResponse(c, "room not created");
  }
});

// route for joining an existing room
app.post("/join/:inviteCode", verifyUser, async (c) => {
  try {
    const inviteCode = c.req.param("inviteCode");
    const user = c.get("user");

    if (!inviteCode) {
      return errorResponse(c, "Invite code missing");
    }

    const isValid = await db
      .select()
      .from(rooms)
      .where(sql`${rooms.inviteCode} = ${inviteCode}`);

    if (!isValid) {
      return errorResponse(c, "Invalid invite code");
    }
    let i = 0;
    let memberExists = false;
    for (i = 0; i < isValid.length; i++) {
      if (isValid[i].member === user.id) {
        memberExists = true;
      }
    }

    if (memberExists) {
      return errorResponse(c, "this member already exists in the room");
    }

    const newMember = await db.insert(rooms).values({
      id: user.id,
      inviteCode: inviteCode,
      ownerId: isValid[0].ownerId,
      member: user.id,
      inRoom: true,
    });

    return successResponse(c, newMember);
  } catch (error) {
    console.error(error);
    errorResponse(c, "can't join room");
  }
});

//route for leaving a room
app.post("/leave/:roomId", verifyUser, async (c) => {
  try {
    const roomId = c.req.param("roomId");
    const user = c.get("user");

    const roomExists = await db
      .update(rooms)
      .set({ inRoom: false })
      .where(
        and(sql`${rooms.id} = ${roomId}`, sql`${rooms.member} = ${user.id}`),
      );
      
    if (!roomExists) {
      return errorResponse(c, "this room doesn't have this user");
    }

    return successResponse(c, "successfully left the room");
  } catch (error) {
    console.error(error);
    return errorResponse(c, "failed to leave the room");
  }
});

//route for getting all the rooms created by a user
app.get("/allRooms", verifyUser, async (c) => {
  try {
    const user = c.get("user")

    const allRooms = await db.select().from(rooms)
                      .where(sql`${rooms.ownerId} = ${user.id}`)

    return successResponse(c, allRooms)
  } catch (error) {
    console.log(rooms)
    return errorResponse(c, "can't get rooms")
  }
})

export default app;
