import api from "../axios";

export async function joinRoom(roomCode:string) {
    try {
        api.post(`/room/join/${roomCode}`)
    } catch (error) {
        console.error(error)
    }
}