"use client";

import { useMember } from "@/lib/hooks/useMember";
import { useRoom } from "@/lib/hooks/useRoom";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function page() {
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
      {canvases.length > 0 && canvases.map((canvas) => <h1>{canvas.userId}</h1>)}

      <button>create canvas</button>
    </div>
  );
}
