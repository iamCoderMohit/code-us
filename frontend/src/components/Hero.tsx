"use client";

import { Editor } from "@monaco-editor/react";
import Feature from "./Feature";
import Line from "./Line";
import Footer from "./Footer";

export default function Hero() {
  return (
    <div className="px-4 sm:px-8 md:px-15">
      <div className="flex flex-col gap-6 sm:gap-10 mt-20 sm:mt-32 md:mt-40">
        <div className="text-4xl sm:text-4xl md:text-5xl font-[500]">
          <h1>The collaborative code editor</h1>
          <h1>for real time coding</h1>
        </div>
        <h1 className="opacity-60 text-sm sm:text-base">
          Real time code broadcasting for each member
        </h1>
      </div>

      <div className="mt-8 sm:mt-10 rounded-md overflow-hidden">
        <Editor
          height={"300px"}
          defaultLanguage="javascript"
          value={`console.log("hey there")\nconst a = 10\nconst b = 20\n//this is your real time code editor\n//log in or go to rooms -> canvas section to make this happen`}
          theme="vs-dark"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center text-2xl sm:text-3xl md:text-4xl mt-8 sm:mt-10 font-medium gap-1 sm:gap-0">
        <h1>Where teams code together —</h1>
        <p className="sm:ml-5 opacity-60">faster, smarter, and in sync.</p>
      </div>

      <div className="mt-8 sm:mt-10 border border-white/40 p-4 sm:p-5 flex flex-col gap-10 sm:gap-15">
        <Feature title="Create rooms with invite code" content="Your friends join the canvas with the invite code. All members work on the same canvas with real time updates" />
        <Line />
        <Feature title="Create multiple canvases inside room" content="You can create as many canvases as you want inside any room, makes the work separated and easy for teams" isRev />
        <Line />
        <Feature title="Join canvas with your team" content="Join the canvas with code editor with your team, everyone sees real time updation, with the user details on cursor" />
      </div>

      <div className="mt-16 sm:mt-24 md:mt-30">
        <Footer />
      </div>
    </div>
  );
}