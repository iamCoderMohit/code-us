"use client";

import RoomCard from "@/components/RoomCard";
import SearchRoom from "@/components/SearchRoom";
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
    <div className="">
      <h1 className="text-xl font-bold mb-5">Create a room</h1>
      
      <div className="flex gap-5">
        {code.length > 0 && <h1>Invite code: {code}</h1>}
      <button onClick={createCode} className="cursor-pointer bg-blue-600/50 px-3 rounded-md">generate other invite code</button>
      </div>

      <button
        className="bg-purple-600 px-3 cursor-pointer mt-5 rounded-md"
        onClick={async () => {
            await createRoom(code),
            await allRooms()
        }}
      >
        Create room
      </button>

      <div className="mt-10">
      <h1 className="text-xl font-bold">Join a room</h1>

      <SearchRoom />

        <h1 className="mb-5">Rooms created by you</h1>
        {room.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="flex justify-around">
              <h1>Created by</h1>
              <h1>Invite code</h1>
            </div>
            {room.map((r) => (
              <RoomCard id={r.id} owner={r.owner.fullName} roomCode={r.inviteCode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
