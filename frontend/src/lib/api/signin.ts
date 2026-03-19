import { supabase } from "../supabase/client"

export const signin = async () => {
    try {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "https://code-us-orcin.vercel.app//auth/callback"
            }
        })
    } catch (error) {
        
    }
}