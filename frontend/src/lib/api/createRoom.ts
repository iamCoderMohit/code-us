import api from "../axios";

export async function createRoom(roomCode: string) {
    try {
        await api.post("/room/create", {roomCode})
    } catch (error) {
        console.error(error)    
    }
}