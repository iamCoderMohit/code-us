import { Context, Next } from "hono";
import { errorResponse } from "../utils/apiResponse";
import { supabaseAdmin } from "../config/supabase";

export const verifyUser = async (c: Context, next: Next) => {
  {
    const token = c.req.header("Authorization")?.split(" ")[1];

    if(!token) return errorResponse(c, "Token not found")

    const {data, error} = await supabaseAdmin.auth.getUser(token)

    if(error) return errorResponse(c, "Invalid token")

    c.set("user", data.user)

    return await next();
  }
};
