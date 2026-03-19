export const ws = new WebSocket("wss://code-us-ezt6.onrender.com/ws")

ws.onopen = () => {
    console.log("connected to server")
}

ws.onerror = (err) => {
    console.error("websocket error", err)
}