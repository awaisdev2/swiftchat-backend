import express from "express";
import cors from "cors";
import { createServer } from "http";
import "dotenv/config";

import { initSocket } from "./src/config/socket.js";
import { injectSocket } from "./src/middlewares/injectSocket.middleware.js";
import { requireAuth } from "./src/middlewares/auth.middleware.js";

import indexRoutes from "./src/routes/index.js";

const app = express();
const httpServer = createServer(app);
initSocket(httpServer);
const port = process.env.PORT || 6011;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',  // Make sure this matches your frontend URL
  credentials: true,  // Enable credentials (cookies, headers, etc.)
}));

app.use(express.json());
app.use(injectSocket);
app.use(requireAuth);
app.use("/api", indexRoutes);

httpServer.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
