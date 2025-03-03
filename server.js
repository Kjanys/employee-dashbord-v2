/* eslint-disable @typescript-eslint/no-explicit-any */
import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.WEBSOCKET_HOST_NAME;
const port = process.env.WEBSOCKET_PORT_NAME;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    path: "/socket/",
    cors: {
      origin: process.env.WEBSOCKET_ORIGIN_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`WebSocket conected success`);

    socket.on("incidentAdded", (incident) => {
      socket.emit("incidentAddRecive", incident);
    });
    socket.on("incidentUpdated", (incident) => {
      socket.emit("incidentUpdatedRecive", incident);
    });
    socket.on("incidentDeleted", (id) => {
      socket.emit("incidentDeletedRecive", id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`>WebSocket ready on http://${hostname}:${port}`);
    });
});
