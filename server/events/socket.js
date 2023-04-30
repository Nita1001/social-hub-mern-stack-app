const { createMessage } = require("../controllers/messageController.js");
const socketIo = require("socket.io");

// Define socket connections
const init = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
        pingTimeout: 160000 // 2.40 minutes
    });

    // const confirmedUsers = {};
    let confirmedCount = 0;
    const connectedUsers = {};
    const pendingOffers = {};

    // Connection event
    io.on("connection", (socket) => {
        console.log('New CC');
        const clientId = socket.handshake.query.clientId;
        console.log("Client connected: ", clientId);
        connectedUsers[clientId] = socket;

        // Check for pending trade offers
        if (clientId in pendingOffers) {
            const offer = pendingOffers[clientId];
            socket.emit("tradeOffer", { senderId: offer.senderId, recipientId: clientId, offer: offer.offer });
            delete pendingOffers[clientId];
        }

        // Handle joining the Conversation
        socket.on("joinConversation", (conversationId) => {
            socket.join(conversationId);
            console.log(`Socket ${socket.id} joined 'room' ${conversationId}`);
        });

        // TODO Handle leaving the Conversation
        socket.on("leave", (room) => {
            socket.leave(room);
            console.log(`Socket ${socket.id} left 'room' ${room}`);
        });

        // Handle incoming message events
        socket.on("message", async ({ conversationId, message }) => {
            console.log("New message received: ", message);

            // Create the message using the message controller
            console.log('socket.js | Message', message);
            const createdMessage = await createMessage(message);
            console.log('createdMessage', createdMessage);

            // Send message to the other connected clients in the room
            io.to(conversationId).emit("message", createdMessage);
        });

        // Handle incoming trade offer events
        socket.on("tradeOffer", (data, callback) => {
            console.log(`Trade offer received from ${data.senderId} offer is: ${data.offer}.`);
            // Store the offer for the recipient
            pendingOffers[data.recipientId] = data.offer;
            // Check if the recipient user is connected
            const recipientSocket = connectedUsers[data.recipientId];
            if (recipientSocket) {
                recipientSocket.emit("tradeOffer", data);
                callback({ success: true, offer: data.offer }); // send a success response
            } else {
                // Check if the recipient user has a pending offer
                if (data.recipientId in pendingOffers) {
                    callback({ success: false, error: "Recipient user is not connected. Pending offer: " + pendingOffers[data.recipientId] }); // send the pending offer as an error response
                } else {
                    callback({ success: false, error: "Recipient user is not connected." }); // send an error response
                }
            }
        });

        socket.on("tradeConfirmed", ({ userId }) => {
            console.log(`Trade confirmed by ${userId}.`);
            confirmedCount += 1;
            if (confirmedCount === 2) {
                console.log("Both users have confirmed the trade");
                io.emit("tradeCompleted");
                confirmedCount = 0;
            }
        });

        // Disconnection event
        socket.on("disconnect", () => {
            console.log("Client disconnected: ", clientId);
        });
    });
};

module.exports = { init };
