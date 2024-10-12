import { Server } from "socket.io";
import { createServer } from "http";
import express, { Request, Response } from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import path from "path";
import { SocketAddress } from "net";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __dirName = dirname(fileURLToPath(import.meta.url));

app.get("/", (req: Request, res: Response) => {
  console.log("hey");
  res.sendFile(join(__dirName, "../static/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
