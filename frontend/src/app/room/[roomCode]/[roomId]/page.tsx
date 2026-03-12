"use client";

import { createCanvas } from "@/lib/api/createCanvas";
import { joinCanvas } from "@/lib/api/joinCanvas";
import { useMember } from "@/lib/hooks/useMember";
import { useRoom } from "@/lib/hooks/useRoom";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const router = useRouter()
  const { roomCode, roomId } = useParams();
  const { allMembers, members } = useMember();
  const { canvases, allCanvases } = useRoom();

  useEffect(() => {
    async function fetch() {
      await allMembers(roomCode as string);
      await allCanvases(roomId as string);
    }

    fetch();
  }, []);

  return (
    <div>
      room info
      <h1>members</h1>
      {members.length > 0 && members.map((mem) => <h1>{mem.userId}</h1>)}
      <h1>canvases</h1>
      {canvases.length > 0 && canvases.map((canvas) => 
        <div className="flex justify-around"
        onClick={() => router.push(`/room/${roomCode}/${roomId}/${canvas.id}`)}
        >
            <h1>{canvas.id}</h1>
            <button className="bg-orange-400" onClick={() => joinCanvas(canvas.id)}>Join canvas</button>
        </div>
    )}

      <button
      className="bg-red-400"
      onClick={() => createCanvas("my canvas", roomId as string)}>create canvas</button>
    </div>
  );
}
