import { Hono } from 'hono'
import auth from "./routes/auth.route"
import { successResponse } from './utils/apiResponse'

const app = new Hono()

app.get("/", async (c) => {
    // successResponse(c, {done: 'done'})
    c.text("done")
})

app.route("/api/v1/auth", auth)

export default app