import api from "../axios";

export async function getRoomId(roomCode:string) {
    try {
        const res = await api.get(`/room/getRoomId/${roomCode}`)

        return res.data.data
    } catch (error) {
        console.error(error)
    }
}