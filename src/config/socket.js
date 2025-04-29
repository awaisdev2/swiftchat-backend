import { Server } from "socket.io";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    // Join a room (channel)
    socket.on("join-channel", (channelId) => {
      socket.join(channelId);
      console.log(`📥 ${socket.id} joined channel ${channelId}`);
    });

    // Leave a room (optional)
    socket.on("leave-channel", (channelId) => {
      socket.leave(channelId);
      console.log(`📤 ${socket.id} left channel ${channelId}`);
    });

    // When a message is sent
    socket.on("send-message", (msg) => {
      socket.to(msg.channelId).emit("receive-message", msg);
      console.log(`📤 ${socket.id} send message to channel ${msg.channelId}`);
    });    

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
};

// ✅ Export getIO so it can be injected later
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
