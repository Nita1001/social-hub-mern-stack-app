# social-hub-mern-stack-app
# Server README

This server is built using Node.js and Express.js framework. It provides APIs for managing users, accounts, inventory, and transactions.

## Getting Started

To get started with the server, follow the steps below:

1. Clone the repository to your local machine.
2. Install the dependencies using `npm install`.
3. Create a `.env` file in the root directory and add the following environment variables:

`NODE_ENV=development`
`PORT=5000`
`MONGO_URI=<your_mongodb_uri>`

4. Start the server using `npm start`.

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

### Accounts

- `GET /api/accounts/:id` - Get an account by ID
- `POST /api/accounts` - Create a new account
- `DELETE /api/accounts/:id` - Delete an account by ID

### Inventory

- `GET /api/inventory/:id` - Get an inventory by ID
- `POST /api/inventory` - Create a new inventory

### Transactions

- `POST /api/transactions/credit` - Update credit for an account
- `POST /api/transactions/transfer` - Transfer money between accounts
- `POST /api/transactions/deposit` - Deposit cash into an account
- `POST /api/transactions/withdraw` - Withdraw cash from an account
- `GET /api/transactions/:accountId` - Get all transactions for an account

## Error Handling

The server handles errors by returning appropriate HTTP status codes and error messages in JSON format.

## Validation

The server validates user input using Mongoose schema validation and custom validation functions.

## Dependencies

- express
- mongoose
- dotenv
- nodemon (dev dependency)

## License

This project is licensed under the MIT
