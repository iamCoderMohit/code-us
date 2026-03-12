import api from "../axios";

export async function joinCanvas(canvasId:string) {
    try {
        await api.post(`/canvas/${canvasId}/join`)
    } catch (error) {
        console.error("cant join canvas")
    }
}