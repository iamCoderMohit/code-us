"use client";

import RoomCard from "@/components/RoomCard";
import { createRoom } from "@/lib/api/createRoom";
import { generateCode } from "@/lib/generateCode";
import { useRoom } from "@/lib/hooks/useRoom";
import { useEffect, useState } from "react";

export default function page() {
  const [code, setCode] = useState("");
  const { allRooms, room } = useRoom();

  useEffect(() => {
    allRooms();
    setCode(generateCode());
}, []);

function createCode() {
    setCode(generateCode());
  }

  return (
    <div className="px-10 py-5">
      <h1 className="text-xl font-bold mb-5">Create a room</h1>
      
      <div className="flex gap-5">
        {code.length > 0 && <h1>Invite code: {code}</h1>}
      <button onClick={createCode} className="cursor-pointer bg-blue-600/50 px-3 rounded-md">generate other invite code</button>
      </div>

      <button
        className="bg-purple-600 px-3 cursor-pointer mt-5 rounded-md"
        onClick={async () => {
            createRoom(code),
            await allRooms()
        }}
      >
        Create room
      </button>

//now in the room data you have user info, so show it to the ui
      <div className="mt-10">
      <h1 className="text-xl font-bold">Join a room</h1>
        <h1 className="mb-5">Rooms created by you</h1>
        {room.length > 0 && (
          <div className="flex flex-col gap-5">
            {room.map((r) => (
              <RoomCard id={r.id} owner={r.ownerId} roomCode={r.inviteCode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
