# Coin Converter App Setup

## Database Setup

This application uses PostgreSQL with Prisma ORM. Follow these steps to set up the database:

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/coin_converter?schema=public"

# JWT Secret (for authentication)
JWT_SECRET="your-super-secret-jwt-key-here"

# Application
PORT=3000
NODE_ENV=development
```

### 2. Database Setup

1. Install PostgreSQL on your system
2. Create a new database named `coin_converter`
3. Update the `DATABASE_URL` in your `.env` file with your actual database credentials

### 3. Database Migration

Run the following commands to set up the database schema:

```bash
# Generate Prisma client
npx prisma generate

# Create and apply database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 4. Start the Application

```bash
# Install dependencies
npm install

# Start in development mode
npm run start:dev
```

## API Endpoints

### Users

- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Currencies

- `POST /currencies` - Create a new currency
- `GET /currencies` - Get all currencies
- `GET /currencies/:id` - Get currency by ID
- `PATCH /currencies/:id` - Update currency
- `DELETE /currencies/:id` - Delete currency
- `POST /currencies/update-rates` - Update currency rates

### Favorite Currencies

- `POST /favorite-currencies` - Add currency to favorites
- `GET /favorite-currencies` - Get all favorite currencies
- `GET /favorite-currencies/user/:userId` - Get user's favorite currencies
- `GET /favorite-currencies/:id` - Get favorite currency by ID
- `DELETE /favorite-currencies/:id` - Remove favorite currency
- `DELETE /favorite-currencies/user/:userId/currency/:currencyId` - Remove specific favorite

## Database Schema

### User

- `id` (String, Primary Key)
- `firstName` (String)
- `lastName` (String)
- `email` (String, Unique)
- `password` (String, Hashed)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Currency

- `id` (String, Primary Key)
- `name` (String)
- `code` (String, Unique)
- `symbol` (String)
- `type` (Enum: FIAT, CRYPTO, COMMODITY)
- `rate` (Float)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### FavoriteCurrency

- `id` (String, Primary Key)
- `userId` (String, Foreign Key)
- `currencyId` (String, Foreign Key)
- `createdAt` (DateTime)

## Features

- User management with password hashing
- Currency management with different types (Fiat, Crypto, Commodity)
- Favorite currencies for users
- Real-time currency rate updates
- RESTful API endpoints
- Input validation using class-validator
- Error handling with proper HTTP status codes
