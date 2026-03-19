"use client";

import { createCanvas } from "@/lib/api/createCanvas";
import { joinCanvas } from "@/lib/api/joinCanvas";
import { joinRoom } from "@/lib/api/joinRoom";
import { useMember } from "@/lib/hooks/useMember";
import { useRoom } from "@/lib/hooks/useRoom";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const { roomCode, roomId } = useParams();
  const { allMembers, members } = useMember();
  const { canvases, allCanvases } = useRoom();
  const [canvasName, setCanvasName] = useState("my-canvas");

  useEffect(() => {
    async function fetch() {
      await allMembers(roomCode as string);
      await allCanvases(roomId as string);
    }

    fetch();
  }, []);

  return (
    <div className="">
      <h1 className="font-bold text-xl">Room info</h1>
      <button
        onClick={() => joinRoom(roomCode as string)}
        className="bg-blue-600 py-1 px-4 rounded-md mt-5 cursor-pointer"
      >
        Join Room
      </button>
      <h1 className="mt-10 text-lg font-bold mb-5">Members</h1>
      {members.length > 0 &&
        members.map((mem) => (
          <h1 className="bg-gray-600/40 hover:bg-gray-600/80 px-5 py-2 transition-all rounded-md">
            {mem.owner.fullName}
          </h1>
        ))}
      <h1 className="mt-10 text-lg font-bold mb-5">Canvases</h1>
      <input
        type="text"
        placeholder="enter a name for canvas..."
        className="border px-3 py-1 rounded-md mr-2"
        onChange={(e) => setCanvasName(e.target.value)}
      />
      <button
        className="bg-blue-600 py-1 px-4 rounded-md mb-5 cursor-pointer"
        onClick={async () => {
            await createCanvas(canvasName, roomId as string),
            await allCanvases(roomId as string);
        }}
      >
        create canvas
      </button>
      {canvases.length > 0 && (
        <div className="flex gap-5 flex-col">
          {canvases.map((canvas) => (
            <div
              className="flex justify-around bg-gray-600/40 hover:bg-gray-600/80 transition-all py-3 rounded-md"
              onClick={() =>
                router.push(`/room/${roomCode}/${roomId}/${canvas.id}`)
              }
            >
              <h1>{canvas.name}</h1>
              <button
                className="font-bold cursor-pointer"
                onClick={() => joinCanvas(canvas.id)}
              >
                Join canvas
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
