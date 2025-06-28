const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");         
const { Server } = require("socket.io");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

dotenv.config();

const app = express();
const server = http.createServer(app); // Use http server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend to connect (use specific origin in prod)
  },
});

const port = 3000;

app.set("io", io);
app.use(cors());
app.use(express.json());


app.use("/posts", postsRouter);
app.use("/users", usersRouter);


mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});
io.on("disconnect", (socket) => {
  console.log("Client disconnected:", socket.id);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
