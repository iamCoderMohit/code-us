import { useRoom } from "@/lib/hooks/useRoom";
import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";

export default function SearchRoom() {
  const { searchRoom, findRoom } = useRoom();
  const [inviteCode, setInviteCode] = useState("");


  useEffect(() => {
    const timeout = setTimeout(async () => {
      await findRoom(inviteCode);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inviteCode]);

  return (
    <div className="mt-5 mb-5">
      <input
        type="text"
        placeholder="enter room invite code..."
        className="border rounded-md px-3 py-1"
        onChange={(e) => setInviteCode(e.target.value)}
      />

      {(inviteCode.length > 0) && (searchRoom ? (
        <div className="mt-5">
          <RoomCard
            id={searchRoom.id}
            owner={searchRoom.owner.fullName}
            roomCode={searchRoom.inviteCode}
          />{" "}
        </div>
      ) : (
        <h1 className="mt-2 text-center">
          <i>No room found with this invite code.</i>
        </h1>
      ))}
    </div>
  );
}
