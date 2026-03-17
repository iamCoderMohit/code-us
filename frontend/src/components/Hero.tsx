"use client"

import {Editor} from "@monaco-editor/react"

export default function Hero() {
    return (
        <div className="px-15">
            <div className="flex flex-col gap-10 mt-40">
                <div className="text-5xl font-[500]">
                <h1>The collaborative code editor</h1>
                <h1>for real time coding</h1>
            </div>
            <h1 className="opacity-60">Real time code broadcasting for each member</h1>
            </div>

            <div className="mt-10 rounded-md">
                <Editor 
            height={"500px"}
            defaultLanguage="javascript"
            value={`console.log("hey there")\nconst a = 10\nconst b = 20\n//this is your real time code editor\n//log in or go to rooms -> canvas section to make this happen`}
            theme="vs-dark"
            
            />
            </div>
        </div>
    )
}