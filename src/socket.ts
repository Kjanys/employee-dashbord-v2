"use client";

import io from "socket.io-client";

export const socket = io(
  process.env.WEBSOCKET_ORIGIN_URL ?? "http://localhost:3001",
  {
    path: "/socket/",
    withCredentials: true,
  }
);
