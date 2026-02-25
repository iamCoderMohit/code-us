import { Hono } from 'hono'
import { cors } from 'hono/cors'
import auth from "./routes/auth.route"
import room from "./routes/room.route"
import code from "./routes/code.route"
import canvas from "./routes/canvas.route"

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
app.route("/api/v1/code", code)
app.route("/api/v1/canvas", canvas)

export default app