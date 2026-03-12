import { Hono } from "hono";
import { verifyUser } from "../middleware/auth";
import { User } from "../customTypes/user";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { db } from "../config/drizzle";
import { code } from "../db/schema/code";
import { desc, sql } from "drizzle-orm";

const app = new Hono<{Variables: {user: User}}>()

app.post("/create", verifyUser, async (c) => {
    try {
        const user = c.get("user")
        const {codeSnippet, canvasId} = await c.req.json()

        if(!codeSnippet) {
            return errorResponse(c, "please provide some content")
        }

        await db.insert(code).values({
            code: codeSnippet,
            canvasId,
            createyBy: user.id
        })

        return successResponse(c, "code snippet created")
    } catch (error) {
        console.error(error)
        return errorResponse(c, "Can't create code snippet")
    }
})

//get the canvas content 
app.get("/info/:canvasId", verifyUser, async (c) => {
    try {
        const canvasId = c.req.param("canvasId")
        const content = await db.select().from(code)
            .where(sql`${code.canvasId} = ${canvasId}`)
            .orderBy(desc(code.createdAt))
            .limit(1)

        return successResponse(c, content)
    } catch (error) {
        console.error(error)
        return errorResponse(c, "can't get code")
    }
})

export default app