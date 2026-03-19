import { useState } from "react"
import api from "../axios"
import { getRoomId } from "../api/getRoomId"
import { member } from "@/types/types"

export function useMember() {
    const [members, setMembers] = useState<member[]>([])

    const allMembers = async (roomCode: string) => {
        try {
            const roomId = await getRoomId(roomCode)
            const res = await api.get(`/room/all/${roomId}`)
            setMembers(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        allMembers,
        members
    }
}