import api from "../axios";

export async function saveCode(codeSnippet: string, canvasId: string) {
    try {
        await api.post("/code/create", {
            codeSnippet,
            canvasId
        })
    } catch (error) {
        console.error(error)
    }
}