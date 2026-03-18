"use client";

import { Editor } from "@monaco-editor/react";
import Feature from "./Feature";
import Line from "./Line";
import Footer from "./Footer";

export default function Hero() {
  return (
    <div className="px-15">
      <div className="flex flex-col gap-10 mt-40">
        <div className="text-5xl font-[500]">
          <h1>The collaborative code editor</h1>
          <h1>for real time coding</h1>
        </div>
        <h1 className="opacity-60">
          Real time code broadcasting for each member
        </h1>
      </div>

      <div className="mt-10 rounded-md">
        <Editor
          height={"500px"}
          defaultLanguage="javascript"
          value={`console.log("hey there")\nconst a = 10\nconst b = 20\n//this is your real time code editor\n//log in or go to rooms -> canvas section to make this happen`}
          theme="vs-dark"
        />
      </div>

      <div className="flex text-4xl mt-10 font-medium">
        <h1>Where teams code together —</h1>
        <p className="ml-5 opacity-60">faster, smarter, and in sync.</p>
      </div>

      <div className="mt-10 border border-white/40 p-5 flex flex-col gap-15">
        <Feature title="Create rooms with invite code" content="Your friends join the canvas with the invite code. All members work on the same canvas with real time updates" />
        <Line />
        <Feature title="Create multiple canvases inside room" content="You can create as many canvases as you want inside any room, makes the work separated and easy for teams" isRev />
        <Line />
        <Feature title="Join canvas with your team" content="Join the canvas with code editor with your team, everyone sees real time updation, with the user details on cursor" />
      </div>
      <div className="mt-30">
        <Footer />
      </div>
    </div>
  );
}
