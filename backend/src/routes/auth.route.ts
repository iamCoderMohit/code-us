import { Context, Hono, Next } from "hono"
import { errorResponse, successResponse } from "../utils/apiResponse"

const app = new Hono()

// app.use(
//     async (c: Context, next) => {
//     const token = c.req.header("Authorization")?.split(" ")[1]

//     console.log(token)

//     await next()
// }
// )

app.get("/sync-user", async (c) => {
    try {
        successResponse(c, {done: "done"})
    } catch (error) {
        errorResponse(c)
    }
})

export default app