"use client";

import { saveCode } from "@/lib/api/saveCode";
import { useCanvas } from "@/lib/hooks/useCanvas";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ws } from "@/lib/websocket/socket";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  { ssr: false },
);

export default function Page() {
  const { canvas, getCanvasInfo, code, getCanvasContent, setCode } =
    useCanvas();
  const { canvasId } = useParams();
  const [content, setContent] = useState("");

  const saveTimeout = useRef<any>(null);
  const isRemoteUpdate = useRef(false);
  const editorRef = useRef<any>(null)

  function handleEditorMount(editor: any) {
    editorRef.current = editor
  }

  function showRemoteCursor(data: any) {
    const decorations = editor.
  }

  function handleChange(value: any) {
    if (!value) return;
    if (isRemoteUpdate.current) return;

    const newCode = value;
    setCode(newCode);

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      const fullCode = newCode;

      saveCode(fullCode, canvasId as string);
    }, 2000);

    ws.send(
      JSON.stringify({
        type: "code-change",
        code: newCode,
        canvasId,
      }),
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "code-change") {
        isRemoteUpdate.current = true;

        setCode(data.code);

        isRemoteUpdate.current = false;
      }

      if(data.type === "cursor-move") {
        showRemoteCursor(data)
      }
    };
  }

  useEffect(() => {
    async function fetch() {
      await getCanvasInfo(canvasId as string);
      await getCanvasContent(canvasId as string);
    }

    fetch();
  }, []);

  useEffect(() => {
    if(!editorRef.current) return

    const editor = editorRef.current

    const disposable = editor.onDidChangeCursorPosition((e: any) => {
        const position = e.position

        ws.send(
            JSON.stringify({
                type: "cursor-move",
                line: position.lineNumber,
                column: position.column
            })
        )
    })

    return () => {
        disposable.dispose()
    }
  }, [])

  return (
    <div>
      <input
        type="text"
        className="border"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-orange-300"
        onClick={() => saveCode(content, canvasId as string)}
      >
        save changes
      </button>
      {canvas.length > 0 && (
        <div>
          <h1 className="text-xl">{canvas[0].name}</h1>

          {code.length > 0 && (
            <MonacoEditor
              height="500px"
              defaultLanguage="javascript"
              value={code}
              onMount={handleEditorMount}
              onChange={handleChange}
              theme="vs-dark"
            />
          )}
        </div>
      )}
    </div>
  );
}
