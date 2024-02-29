// server.js

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
const http = require("http").Server(app);
const socketModule = require("./socket");

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual origin of your React app
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

const io = socketModule.init(http);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendNotification", (notification) => {
    console.log("Received notification:", notification);
    console.log("🚀 ~ socket.on ~ notification:", notification);

    // Handle notification data
    // You may want to store notifications in a database for persistence

    // Broadcast the notification to all connected clients
    io.emit("receiveNotification", notification);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
