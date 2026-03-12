export const ws = new WebSocket("ws://localhost:3001/ws")

ws.onopen = () => {
    console.log("connected to server")
}

ws.onerror = (err) => {
    console.error("websocket error", err)
}