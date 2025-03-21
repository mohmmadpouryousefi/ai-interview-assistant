# AI Interview Assistant Backend

This is the Express.js backend for the AI Interview Assistant application.

## Setup

1. Install dependencies:

   ```
   cd backend
   npm install
   ```

2. Set up environment variables:

   - Copy `.env.example` to `.env` (or use the existing `.env` file)
   - Update the MongoDB URI and JWT secret as needed

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user

  - Body: `{ name, email, password }`
  - Returns: User data and JWT token

- `POST /api/auth/login` - Login

  - Body: `{ email, password }`
  - Returns: User data and JWT token

- `GET /api/auth/me` - Get current user (requires authentication)
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Returns: User data

## Technology Stack

- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
