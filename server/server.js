const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require('./config/dbConn.js');
const errorHandler = require('./middleware/errorHandler.js');
const http = require('http');
const { init } = require('./events/socket.js');

const app = express();
const server = http.createServer(app);

// Load environment config.env 
dotenv.config({ path: './config/config.env' });

// Serve static files from the client's build directory
app.use("/", express.static("../client/dist"));

// Parse request body
app.use(express.json());

// Routes
app.get('/api', (req, res) => res.send('Server running'));
app.use('/api/users', require('./routes/users'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/inventories', require('./routes/inventories'));
app.use('/api/inventories/items', require('./routes/items'));
app.use('/api/conversations', require('./routes/conversations.js'));
app.use('/api/conversations/messages', require('./routes/messages.js'));
app.use('/api/trades', require('./routes/trades'));
// Error handling middleware
app.use(errorHandler);


// Connect to MongoDB before listening 
(async () => {
    try {
        console.log(`process.env.CONNECTION_STRING: ${process.env.CONNECTION_STRING}`);

        await connectDb();

        init(server);

        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
})();
