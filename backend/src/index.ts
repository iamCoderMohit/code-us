import { Hono } from 'hono'
import { cors } from 'hono/cors'
import auth from "./routes/auth.route"
import room from "./routes/room.route"

const app = new Hono()

app.use(
    "/api/v1/*",
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)

app.route("/api/v1/auth", auth)
app.route("/api/v1/room", room)

export default app