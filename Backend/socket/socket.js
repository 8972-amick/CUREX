import { Server } from "socket.io";
import prisma from "../db/prisma.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
      ],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // join chat room
    socket.on("joinChat", (chatId) => {
      socket.join(`chat-${chatId}`);
    });

    // send message
    socket.on("sendMessage", async (data) => {
      try {
        const { chatId, senderId, text } = data;
        if (!chatId || !senderId || !text || typeof text !== "string" || !text.trim()) {
          return;
        }

        const message = await prisma.message.create({
          data: {
            text,
            chatId,
            senderId,
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        io.to(`chat-${chatId}`).emit("receiveMessage", message);
      } catch (error) {
        console.error("Socket message error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};