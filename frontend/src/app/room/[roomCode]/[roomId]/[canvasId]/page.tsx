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
  const editorRef = useRef<any>(null);
  const monacoref = useRef<any>(null);
  const cursorDecorations = useRef<any>({});
  const userName = useRef(
    "User" + Math.random().toString(36).substring(2, 5).toUpperCase(),
  );

  function handleEditorMount(editor: any, monaco: any) {
    editorRef.current = editor;
    monacoref.current = monaco;

    editor.onDidChangeCursorPosition((e: any) => {
      const position = e.position;

      ws.send(
        JSON.stringify({
          type: "cursor-move",
          userId: userId.current,
          userName: userName.current,
          canvasId,
          line: position.lineNumber,
          column: position.column,
        }),
      );
    });
  }

  const userId = useRef(Math.random().toString(36).slice(2));

  function showRemoteCursor(data: any) {
    const editor = editorRef.current;
    const monaco = monacoref.current;

    if (!editor || !monaco) return;
    if (data.userId === userId.current) return;

    const decoration = {
      range: new monaco.Range(
        data.line,
        data.column,
        data.line,
        data.column, //there was +1 here  
      ),
      options: {
        className: "remote-cursor",
        hoverMessage: {value: data.userName},
        before: { 
          content: data.userName,
          inlineClassName: "remote-cursor-label",
        },
      },
    };

    const previous = cursorDecorations.current[data.userId] || [];

    const newDecorations = editor.deltaDecorations(previous, [decoration]);

    cursorDecorations.current[data.userId] = newDecorations;
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

    const editor = editorRef.current;
    const position = editor.getPosition();

    ws.send(
      JSON.stringify({
        type: "code-change",
        code: newCode,
        canvasId,
        cursor: {
          userId: userId.current,
          userName: userName.current,
          line: position.lineNumber,
          column: position.column,
        },
      }),
    );
  }

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === "code-change") {
        console.log(data)
        isRemoteUpdate.current = true;
        setCode(data.code);
        isRemoteUpdate.current = false;

        if (data.cursor) {
          showRemoteCursor(data.cursor);
        }
      }

      if (data.type === "cursor-move") {
        showRemoteCursor(data);
      }
    };
  }, []);

  useEffect(() => {
    async function fetch() {
      await getCanvasInfo(canvasId as string);
      await getCanvasContent(canvasId as string);
    }

    fetch();
  }, []);

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
