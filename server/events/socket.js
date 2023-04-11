const { createMessage } = require("../controllers/messageController.js");
const socketIo = require("socket.io");

// Define socket connections
const init = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
        pingTimeout: 160000 // 1 minute
    });

    // Connection event
    io.on("connection", (socket) => {
        console.log("Client connected: ", socket.id);

        // Handle incoming message events
        socket.on("message", async (message) => {
            console.log("New message received: ", message);

            // Create the message using the message controller
            console.log('MESSAGE 111', message);
            const createdMessage = await createMessage(message);
            console.log('createdMessage', createdMessage);
            // Send message to all connected clients
            io.emit("message", createdMessage);
        });

        // Handle joining/leaving a room   
        socket.on("join", (conversationId) => {
            socket.join(conversationId);
            console.log(`Socket ${socket.id} joined room ${conversationId}`);
        });

        socket.on("leave", (room) => {
            socket.leave(room);
            console.log(`Socket ${socket.id} left room ${room}`);
        });

        // Disconnection event
        socket.on("disconnect", () => {
            console.log("Client disconnected: ", socket.id);
        });
    });
};

module.exports = { init };