import { createFileRoute, Link } from "@tanstack/react-router";
import CreateDocumentDialog from "@/components/CreateDocumentDialog";
import SignOutButton from "@/components/SignOutButton";
import { getAuthSession } from "@/helpers/authHelper";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/(DASHBOARD)/dashboard")({
  component: RouteComponent,
  loader: getAuthSession,
});

function RouteComponent() {
  const session = Route.useLoaderData();
  const wsRef = useRef<WebSocket | null>(null);
  const [count, setCount] = useState(0);

  const document = ["document_1", "document_2", "document_3", "document_4"];

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/ws");

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("connected");

      ws.send(
        JSON.stringify({
          type: "chat",
          payload: "hello server",
        }),
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("received:", data);
    };

    ws.onclose = () => {
      console.log("disconnected");
    };

    ws.onerror = (error) => {
      console.error("websocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [count]);

  const handleSendMessage = () => {
    const ws = wsRef.current;

    if (!ws) {
      console.log("socket not initialized");
      return;
    }

    if (ws.readyState !== WebSocket.OPEN) {
      console.log("socket not connected");
      return;
    }

    ws.send(
      JSON.stringify({
        type: "chat",
        payload: "hello from button",
      }),
    );
  };

  return (
    <div>
      {!session?.data || <SignOutButton />}
      <h1>document list</h1>

      <CreateDocumentDialog />

      {document.map((doc) => (
        <Link key={doc} to="/document/$docId" params={{ docId: doc }}>
          {doc}
        </Link>
      ))}

      <Button onClick={handleSendMessage}>send message</Button>
      <Button onClick={() => setCount(count + 1)}>increment</Button>
    </div>
  );
}
