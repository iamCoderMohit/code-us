"use client"

import { signin } from "@/lib/api/signin";
import api from "@/lib/axios";

export default function Home() {
  return (
    <div>
      <h1>hey there</h1>
      <button onClick={signin}>signin</button>
      <br />
      <button onClick={() => {
        api.get("/auth/test")
      }}>check auth</button>
    </div>
  );
}