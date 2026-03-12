import { useState } from "react";
import api from "../axios";

export function useCanvas() {
    const [canvas, setCanvas] = useState("")

    const getCanvasInfo = async (canvasId: string) => {
        try {
            const res = await api.get(`/canvas/canvasInfo/${canvasId}`)
            setCanvas(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const [code, setCode] = useState([])
    const getCanvasContent = async (canvasId: string) => {
        try {
            const res = await api.get(`/code/info/${canvasId}`)
            
            const content = res.data.data[0].code
            console.log(JSON.stringify(content))
            setCode(content)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        canvas,
        getCanvasInfo,
        code,
        setCode,
        getCanvasContent
    }
}