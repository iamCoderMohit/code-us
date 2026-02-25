import { Hono } from "hono";
import { User } from "../customTypes/user";
import { verifyUser } from "../middleware/auth";
import { db } from "../config/drizzle";
import { code } from "../db/schema";
import { sql } from "drizzle-orm";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { canvas } from "../db/schema/canvas";

const app = new Hono<{Variables: {user: User}}>()

app.post("/create/:codeSnippetId", verifyUser, async (c) => {
    try {
        const user = c.get("user")
        const codeSnippetId = c.req.param("codeSnippetId")

        const codeExists = await db.select().from(code)
                            .where(sql`${code.id} = ${codeSnippetId}`)

        if(!codeExists) {
            return errorResponse(c, "code with this id doesn't exist")
        }

        await db.insert(canvas).values({
            codeSnippet: codeSnippetId,
            user: user.id
        })

        return successResponse(c, "entry added")
    } catch (error) {
        console.error(error)
        return errorResponse(c, "can't create entry")
    }
})

export default app