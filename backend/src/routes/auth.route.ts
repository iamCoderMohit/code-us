import { Context, Hono, Next } from "hono"
import { errorResponse, successResponse } from "../utils/apiResponse"
import { verifyUser } from "../middleware/auth"
import { User } from "../customTypes/user"
import { db } from "../config/drizzle"
import { users } from "../db/schema/users"

const app = new Hono<{ Variables: {user: User}}>()

app.get("/sync-user", verifyUser, async (c) => {
    try {
        const user = c.get("user")
        
        await db.insert(users)
            .values({
                id: user.id,
                email: user.email,
                fullName: user.user_metadata.full_name,
                avatarUrl: user.user_metadata.avatar_url
            })
            .onConflictDoNothing()
        return successResponse(c, {done: "user synced"})
    } catch (error) {
        console.error(error)
        return errorResponse(c, "failed to fetch user")
    }
})

app.get("/test", (c) => {
    return successResponse(c, {data: "done"})
})

export default app