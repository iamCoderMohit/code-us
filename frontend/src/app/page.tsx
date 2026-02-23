"use client"

import { signin } from "@/lib/api/signin";

export default function Home() {
  return (
    <div>
      <h1>hey there</h1>
      <button onClick={signin}>signin</button>
    </div>
  );
}