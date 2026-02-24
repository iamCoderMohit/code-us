"use client"

import api from "@/lib/axios";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback(){
  const router = useRouter()

  useEffect(() => {
    const syncUser = async () => {
      const {data} = await supabase.auth.getSession()
      
      const token = data.session?.access_token

      if(!token) return

      api.get("/auth/sync-user")
      router.push("/") //push to main page later
    }

    syncUser()
  }, [])

  return <p>signing you in...</p>
}