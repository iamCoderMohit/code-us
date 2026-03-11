import { joinRoom } from "@/lib/api/joinRoom"
import { useRouter } from "next/navigation"

interface Input {
    roomCode: string,
    owner: string,
    id: string
}

export default function RoomCard({roomCode, owner, id}: Input) {
    const router = useRouter()
    return (
        <div className="flex w-full justify-around bg-gray-600"
        onClick={() => router.push(`/room/${roomCode}/${id}`)}
        >
            <h1>{owner}</h1>
            <h1>{roomCode}</h1>
            <button onClick={() => joinRoom(roomCode)}>Join Room</button>
        </div>
    )
}