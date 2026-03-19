import { Hono } from "hono";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { verifyUser } from "../middleware/auth";
import { User } from "../customTypes/user";
import { db } from "../config/drizzle";
import { rooms } from "../db/schema/room";
import { and, desc, eq, sql } from "drizzle-orm";
import { members } from "../db/schema/member";
import { canvas } from "../db/schema/canvas";
import { cors } from "hono/cors";

const app = new Hono<{ Variables: { user: User } }>();

app.use(
    "/api/v1/*",
    cors({
        origin: ["http://localhost:3000", "https://code-us-orcin.vercel.app"],
        credentials: true
    })
)

app.post("/create", verifyUser, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();

    if (!body.roomCode || body.roomCode.length < 4) {
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
      ownerId: user.id,
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

    const newMember = await db.insert(members).values({
      userId: user.id,
      roomId: isValid[0].id,
      isActive: true,
    });

    if (!newMember) {
      return errorResponse(c, "this user might already exist in the room");
    }

    return successResponse(c, "successfully joined the room");
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

      const memberExists = await db
        .update(members)
        .set({ isActive: false })
        .where(
          and(
            sql`${members.roomId} = ${roomId}`,
            sql`${members.userId} = ${user.id}`,
          ),
        );

    if (!memberExists) {
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
    const user = c.get("user");

      const allRooms = await db.query.rooms.findMany({
        where: eq(rooms.ownerId, user.id),
        orderBy: desc(rooms.createdAt),
        with: {
          owner: true
        }
      })

    return successResponse(c, allRooms);
  } catch (error) {
    console.log(rooms);
    return errorResponse(c, "can't get rooms");
  }
});

//get all members from a room
app.get("/all/:roomId", verifyUser, async (c) => {
  try {
    const roomId = c.req.param("roomId")

    const allMembers = await db.query.members.findMany({
      where: eq(members.roomId, roomId),
      with: {
        owner: true
      }
    })

    return successResponse(c, allMembers)

  } catch (error) {
    console.error(error)
    return errorResponse(c, "can't get members")
  }
})

//get roomId from roomCode
app.get("/getRoomId/:roomCode", async (c) => {
  try {
    const roomCode = c.req.param("roomCode")

    const room = await db.select().from(rooms)
    .where(sql`${rooms.inviteCode} = ${roomCode}`)

    return successResponse(c, room[0].id)
  } catch (error) {
    console.error(error)
    errorResponse(c, "can't get roomId")
  }
})

//get all canvases in the room
app.get("/allCanvases/:roomId", async (c) => {
  try {
    const roomId = c.req.param("roomId")

    const canvases = await db.select().from(canvas)
      .where(sql`${canvas.roomId} = ${roomId}`)

    return successResponse(c, canvases)
  } catch (error) {
    console.error(error)
    return errorResponse(c, "can't get canvases")
  }
})

// search for a room by invite code
app.get("/findRoom/:inviteCode", verifyUser, async (c) => {
  try {
    const inviteCode = c.req.param("inviteCode")

    const room = await db.query.rooms.findFirst({
      where: eq(rooms.inviteCode, inviteCode),
      with: {
        owner: true
      }
    })

    if(!room) {
      return errorResponse(c, "No room found with this invite code")
    }

    return successResponse(c, room)
  } catch (error) {
    console.error(error)
    return errorResponse(c, "Can't find room")
  }
})

export default app;
