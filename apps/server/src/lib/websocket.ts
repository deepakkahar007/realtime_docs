import { Elysia } from 'elysia'

export const websocket = new Elysia({ name: "websocket" })
  .ws("/ws", {

    open(ws) {
      console.log("client connected");
    },

    message(ws, message) {
      console.log("message:", message);

      ws.send(
        JSON.stringify({
          type: "echo",
          payload: message,
        })
      );
    },

    close() {
      console.log("client disconnected");
    },
  });