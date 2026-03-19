import { useState } from "react";
import api from "../axios";
import { canvas, room, searchRoom } from "@/types/types";

export function useRoom() {
  const [room, setRoom] = useState<room[]>([]);

  const allRooms = async () => {
    try {
      const res = await api.get("/room/allRooms");
      setRoom(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [canvases, setCanvases] = useState<canvas[]>([]);

  const allCanvases = async (roomId: string) => {
    try {
      const res = await api.get(`/room/allCanvases/${roomId}`);
      setCanvases(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [searchRoom, setSearchRoom] = useState<searchRoom | null>();

  const findRoom = async (inviteCode: string) => {
    try {
      const res = await api.get(`/room/findRoom/${inviteCode}`);

        setSearchRoom(res.data.data);

    } catch (error) {
      console.error(error);
      setSearchRoom(null)
    }
  };

  return {
    room,
    allRooms,
    canvases,
    allCanvases,
    searchRoom,
    findRoom,
  };
}
