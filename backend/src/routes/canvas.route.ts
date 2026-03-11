import { Hono } from "hono";
import { User } from "../customTypes/user";
import { verifyUser } from "../middleware/auth";
import { db } from "../config/drizzle";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { canvas } from "../db/schema/canvas";
import { canvas_participants } from "../db/schema/canvas_participants";

const app = new Hono<{ Variables: { user: User } }>();

app.post("/create", verifyUser, async (c) => {
  try {
    const user = c.get("user");
    const {name, roomId} = await c.req.json()

    const [newCanvas] = await db.insert(canvas).values({
      name,
      createdBy: user.id,
      roomId
    })
    .returning({id: canvas.id});

    // add the canvas creator as the canvas partcipant
    await db.insert(canvas_participants).values({
        canvasId: newCanvas.id,
        userId: user.id
    })

    return successResponse(c, "canvas created");
  } catch (error) {
    console.error(error);
    return errorResponse(c, "can't create canvas");
  }
});

app.post("/:canvasId/join", async (c) => {
    try {
        const canvasId = c.req.param("canvasId")
        const userId = c.get("user").id

        await db.insert(canvas_participants).values({
            canvasId,
            userId
        })

        return successResponse(c, "Joined the canvas")
    } catch (error) {   
        console.error(error)
        return errorResponse(c, "Can't join canvas")
    }
})

export default app;
