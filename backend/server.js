import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const BH_PORT = process.env.BH_PORT || 5000;
const FH_URL = process.env.FH_URL || "http://localhost";
const FH_PORT = process.env.FH_PORT || 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [`${FH_URL}:${FH_PORT}`],
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

io.on("connection", (socket) => {
  console.log("a user connected on socket id: " + socket.id);

  socket.on("message", (msg) => {
    // Prevent sending empty messages
    if (msg.text.trim() === "" || !msg) return
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected on socket id: " + socket.id);
  });
});

server.listen(BH_PORT, () => {
  console.log(`Server is listening on port ${BH_PORT}`);
});
