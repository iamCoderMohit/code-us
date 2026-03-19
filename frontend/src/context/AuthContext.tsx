"use client"

import { supabase } from "@/lib/supabase/client";
import { user } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export function AuthProvider({ children }: {children: any}) {
    const [user, setUser] = useState<user | null>(null)

    useEffect(() => {
        //@ts-ignore
        supabase.auth.getUser().then(({data: {user}}) => setUser(user))

        const {data: listner} = supabase.auth.onAuthStateChange((_event, session) => {
            //@ts-ignore
            setUser(session?.user ?? null)
        })

        return () => listner.subscription.unsubscribe()
    }, [])

    //@ts-ignore
    return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)