"use client";

import { useAuth } from "@/context/AuthContext";
import { signin } from "@/lib/api/signin";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  //@ts-ignore
  const { user } = useAuth();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 md:px-20 py-4 border-b-white/60 [border-bottom-width:0.1px]">
      <div
        className="text-lg font-bold cursor-pointer shrink-0"
        onClick={() => router.push("/")}
      >
        CodeUs
      </div>
      <div className="flex items-center gap-4 sm:gap-6 md:gap-10 text-sm">
        <div className="flex items-center gap-3 sm:gap-5 opacity-60">
          {user && (
            <button
              onClick={() => router.push("/room")}
              className="cursor-pointer"
            >
              Rooms
            </button>
          )}
          <button>
            <a href="https://github.com/iamCoderMohit/code-us" target="_blank">
              Github
            </a>
          </button>
        </div>
        <div className="w-px self-stretch bg-white"></div>
        {user ? (
          <button className="cursor-pointer whitespace-nowrap" onClick={signOut}>
            Log out
          </button>
        ) : (
          <div className="flex items-center gap-3 sm:gap-5">
            <button onClick={signin} className="cursor-pointer">
              Log in
            </button>
            <button
              className="bg-white opacity-100 rounded-md px-3 sm:px-4 py-1 text-black cursor-pointer whitespace-nowrap"
              onClick={signin}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}