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

    return {
        room,
        allRooms
    }
}