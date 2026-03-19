import { useRouter } from "next/navigation"

interface Input {
    roomCode: string,
    owner: string,
    id: string
}

export default function RoomCard({roomCode, owner, id}: Input) {
    const router = useRouter()
    return (
        <div className="flex w-full justify-around bg-gray-600/40 hover:bg-gray-600/80 transition-all cursor-pointer py-5 rounded-md"
        onClick={() => router.push(`/room/${roomCode}/${id}`)}
        >
            <h1 className="font-bold">{owner}</h1>
            <h1>{roomCode}</h1>
        </div>
    )
}