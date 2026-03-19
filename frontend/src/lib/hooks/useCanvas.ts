import { useState } from "react";
import api from "../axios";
import { canvas } from "@/types/types";

export function useCanvas() {
    const [canvas, setCanvas] = useState<canvas[]>([])

    const getCanvasInfo = async (canvasId: string) => {
        try {
            const res = await api.get(`/canvas/canvasInfo/${canvasId}`)
            setCanvas(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const [code, setCode] = useState("//start coding")
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