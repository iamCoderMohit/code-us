interface Input {
    roomCode: string,
    owner: string
}

export default function RoomCard({roomCode, owner}: Input) {
    return (
        <div className="flex w-full justify-around bg-gray-600">
            <h1>{owner}</h1>
            <h1>{roomCode}</h1>
        </div>
    )
}