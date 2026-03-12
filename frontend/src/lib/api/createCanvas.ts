import api from "../axios";

export async function createCanvas(name: string, roomId: string) {
    try {
        await api.post(`/canvas/create`, {
            name,
            roomId
        })
    } catch (error) {
        console.error(error)
    }
}