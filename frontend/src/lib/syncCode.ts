import { ws } from "./websocket/socket";

export function setUpCollaboration(editor: any) {
  let isRemoteUpdate = false;

  editor.onDidChangeModelContent(() => {
    if (isRemoteUpdate) return;

    ws.send(
      JSON.stringify({
        type: "code-change",
        code: editor.getValue(),
      }),
    );
  });

    ws.onmessage = (event) => {
    const data = JSON.parse(event.data)

    if (data.type === "code-change") {
      isRemoteUpdate = true
      editor.setValue(data.code)
      isRemoteUpdate = false
    }
  }
}
