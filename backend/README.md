# Amazon Clone Backend

This is the backend for the Amazon Clone project, built with Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── config/
├── controllers/
├── models/
├── routes/
├── .env
├── package.json
└── server.js
```

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Set up MongoDB Atlas:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account or sign in
   - Create a new cluster
   - Create a database user with read/write permissions
   - Add your IP address to the whitelist (or allow access from anywhere for development)
   - Get your connection string from the "Connect" button
   - Update the MONGODB_URI in your [.env](file:backend/.env) file with your actual credentials

3. Update the [.env](file:backend/.env) file:
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.your_cluster.mongodb.net/amazonclone?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/amazonclone?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```