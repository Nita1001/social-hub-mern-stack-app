# Social-hub-mern-stack-app

This is a MERN stack web application that allows users to manage their inventory items and make meaningful connections with other users based on shared interests. Additionally, the app facilitates trades and exchanges between users, enabling them to swap items from their inventories.

## Using Vite

- Vite is used to build the client application in this project.

## Installation

- To install the server dependencies, run the following command in the `server` directory:
`npm install`
- To install the client dependencies, run the following command in the `client` directory:
`npm install`

# Server.js

The server-side code built with Node.js, Express, and MongoDB. 

## Real-Time Communication

The server uses Socket.IO for real-time communication between clients. The Socket.IO server is initialized in the `./events/socket.js` file and is passed the `http.Server` instance created by Express.


- Create a file called `config.env` in the `config` directory and set the following environment variables:

`NODE_ENV=development`
`PORT=5000`
`CONNECTION_STRING=<your-mongodb-connection-string>`

## Getting Started

To start the server & client, run the following command in the server directory:
`npm run dev`
The server will start running in development mode and listen on port `5000`.
The client will start running in development mode and open a browser window at `http://localhost:5173`.

## Routes

The following routes are available:

- `/api/users`: Manage users
- `/api/accounts`: Manage accounts
- `/api/transactions`: Manage transactions
- `/api/inventories`: Manage inventories
- `/api/inventories/items`: Manage inventory items
- `/api/conversations`: Manage conversations
- `/api/conversations/messages`: Manage conversation messages
- `/api/trades`: Manage trades

The server also serves static files from the client's build directory and redirects all other requests to the client's `index.html` file.

## License

This project is licensed under the MIT License.
