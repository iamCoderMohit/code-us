import "dotenv/config"
import {serve} from "@hono/node-server"
import app from "."
import {createNodeWebSocket} from "@hono/node-ws"

const {upgradeWebSocket, injectWebSocket} = createNodeWebSocket({app})

const clients = new Set()

app.get("/ws", upgradeWebSocket((c) => {
    return {
        onOpen(event, ws) {
            clients.add(ws)
            console.log("client connected")
        },

        onMessage(event, ws) {
            console.log("message", event.data)

            clients.forEach((client: any) => {
                if(client !== ws) {
                    client.send(event.data)
                }
            })

            // ws.send(`Echo: ${event.data}`)
        },

        onClose(_, ws) {
            clients.delete(ws)
            console.log("connection closed")
        }
    }
}))

const server = serve({
    fetch: app.fetch,
    port: 3001
})

injectWebSocket(server)