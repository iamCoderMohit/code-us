import { Context } from "hono"
import { StatusCode } from "hono/utils/http-status"

export const successResponse = (c: Context, data: {}, msg = "success", status = 200 as StatusCode) => {
    c.status(status)
    return c.json({
        success: true,
        msg,
        data
    })
}

export const errorResponse = (c: Context, msg = "error", status = 500 as StatusCode) => {
    c.status(status)
    return c.json({
        success: false,
        msg
    })
}