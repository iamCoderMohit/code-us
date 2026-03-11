import { useState } from "react"
import api from "../axios"

export function useRoom() {
    const [room, setRoom] = useState([])

    const allRooms = async () => {
        try {
            const res = await api.get("/room/allRooms")
            setRoom(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const [canvases, setCanvases] = useState([])

    const allCanvases = async (roomId: string) => {
        try {
            const res = await api.get(`/room/allCanvases/${roomId}`)
            setCanvases(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        room,
        allRooms,
        canvases,
        allCanvases
    }
}