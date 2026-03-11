"use client"

import RoomCard from "@/components/RoomCard"
import { createRoom } from "@/lib/api/createRoom"
import { generateCode } from "@/lib/generateCode"
import { useRoom } from "@/lib/hooks/useRoom"
import { useEffect, useState } from "react"

export default function page() {
    const [code, setCode] = useState("")
    const {allRooms, room} = useRoom()

    useEffect(() => {
        allRooms()
    }, [])

    function createCode() {
        setCode(generateCode())
    }

    return (
        <div>
            <h1>create new room</h1>
            <button onClick={createCode}>create code</button>
            {code.length > 0 && <h1>random code: {code}</h1>}

            <button className="bg-purple-600 p-3 cursor-pointer"
            onClick={() => createRoom(code)}
            >create</button>

            {
                room.length > 0 && <div className="flex flex-col gap-5">
                    {room.map((r) => (
                    <RoomCard id={r.id} owner={r.ownerId} roomCode={r.inviteCode} />
                ))}
                </div>
            }
        </div>
    )
}