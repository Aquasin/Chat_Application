// Importing Modules
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

// Setting up dotenv
dotenv.config();

// Setting up Express and Socket IO
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: [process.env.CLIENT_ORIGIN],
        methods: ["GET", "POST"],
    },
});

// On connection with a client
io.on("connection", (socket) => {
    // Logging socket ID
    console.log(socket.id);
    // When user is connected
    socket.on("userconnected", ({ name }) => {
        socket.broadcast.emit("userconnected", { name });
    });

    // When user is disconnected
    socket.on("userdisconnected", ({ name }) => {
        socket.broadcast.emit("userdisconnected", { name });
    });

    // When user starts typing
    socket.on("typing_start", ({ name }) => {
        io.emit("typing_start", { name });
    });

    // When user enters a message
    socket.on("message", ({ name, message }) => {
        // User stops typing
        io.emit("typing_stop");
        io.emit("message", { name, message });
    });
});

app.get("/", (req, res) => {
    res.send({ title: "Hello" });
});

httpServer.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
