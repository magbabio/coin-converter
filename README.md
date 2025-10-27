<table align="center">
  <tr>
  </tr>
  <tr>
    <td align="center">
      <h2>Coin Converter API</h2>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
      <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
      <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
      <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white">
      <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    </td>
  </tr>
</table>

## About the Project

A scalable **NestJS** backend built with **TypeScript**, **Prisma**, and **PostgreSQL**, providing robust user and currency management, real-time currency conversion, and automated exchange rate updates through **web scraping with Puppeteer**. Designed with JWT authentication, role-based access control, and DTO validation for secure and maintainable endpoints.

## Features

- **Exchange Rates Management**: Retrieve and store real-time average exchange rates from Binance via Puppeteer web scraping. 
- **Currencies Management**: Create, update, and retrieve currency data with full validation and conflict handling.  
- **Favorite Currencies**: Users can mark currencies as favorites and retrieve personalized lists.
- **Automated Scraping**: Background CRON jobs run scheduled scraping tasks to keep exchange rates up to date.
- **Users Management**: Create, update, and delete users with hashed passwords and role-based access control.
- **Authentication**: JWT-based authentication for secure access to endpoints.
- **Validation & Error Handling**: DTO validation and centralized exception handling for robust and consistent API responses.

## Architecture

The project follows a modular architecture. Each module is self-contained, encapsulating controllers, services, DTOs, and business logic.

### Modules

- **CurrenciesModule**: Handles currency-related operations.  
- **FavoriteCurrenciesModule**: Allows users to save and manage their favorite currencies.  
- **ExchangeRateModule** : Stores and manages exchange rate data fetched by the scraper.  
- **PrismaModule**: Centralizes the database connection logic via the `PrismaService`.  
- **ScraperModule (Binance)**  
  - Uses **Puppeteer** to automate web scraping from Binance P2P.  
  - Calculates the **average rate** between buy and sell offers.  
  - Supports **scheduled scraping** using CRON tasks.  
- **UsersModule**: Manages user-related operations.  

### Controllers

Each module has its own controller to define API endpoints:

- **CurrenciesController**: Endpoints for currencies CRUD operations.
- **FavoriteCurrenciesController**: Endpoints for favorite currencies management.
- **BinanceController**: Endpoints for scraping and triggering CRON jobs.  
- **UsersController**: Endpoints for user CRUD operations.

### Services

Each module has a service that contains the business logic:

- **CurrenciesService**
- **FavoriteCurrenciesService**
- **ExchangeRateService**  
- **BinanceService**  
- **UsersService**

### DTOs

Data Transfer Objects (DTOs) are used for input validation:

- **CreateCurrencyDto**: Validates currency creation data.
- **UpdateCurrencyDto**: Validates currency update data.
- **CreateUserDto**: Validates user creation data.
- **UpdateUserDto**: Validates user update data.

### Validation

Global validation is enabled using `ValidationPipe` in `main.ts`. This ensures all incoming data is validated against the defined DTOs.

## Setup

### Pre-requisites

- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Node.js](https://nodejs.org/en)
  
### Getting Started

To run the development server, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/clarissaRun/coin-converter.git
cd coin-converter
```

2. Install backend dependencies

```bash
npm install
```

3. Run database migrations

```bash
npx prisma migrate dev
```

4. Start the development server

```bash
npm run start:dev
```

## Project Structure

```
src/
├── auth/                             # Authentication module
├── config/                           # Centralized backend configuration
├── conversion/                       # Conversion module
├── currencies/                       # Currencies module
├── favorite-currencies/              # Favorite currencies module
├── filters/                          # Global exception filter
├── interceptors/                     # Global response interceptor
├── prisma/                           # Prisma ORM configuration and database access
├── scraper/                          # Puppeteer-based web scraping for exchange rates
├── users/                            # Users module
├── app.module.ts                     # Root module
└── main.ts                           # Application entry point

```
## Endpoints

### Authentication

| Method | Endpoint    | Description                                |
| ------ | ----------- | ------------------------------------------ |
| POST   | `/login`    | User login with email and password.        |
| POST   | `/register` | User registration with email and password. |

### Users

| Method | Endpoint      | Description                                                          |
| ------ | ------------- | -------------------------------------------------------------------- |
| POST   | `/users/admin`| Create a new user (ADMIN role required).                             |
| GET    | `/users`      | Retrieve all users (ADMIN role required).                            |
| GET    | `/users/:id`  | Retrieve a user by ID (accessible by ADMIN or the user themselves).  |
| PATCH  | `/user/:id`   | Update user information (accessible by ADMIN or the user themselves).|
| DELETE | `/users/.id`  | Delete a user by ID (ADMIN role required).                           |

### Currencies

| Method | Endpoint          | Description                                                          |
| ------ | ----------------- | -------------------------------------------------------------------- |
| POST   | `/currencies`     | Create a new currency (ADMIN role required).                         |
| GET    | `/currencies`     | Retrieve all currencies.                                             |
| GET    | `/currencies/:id` | Retrieve a currency by ID.                                           |
| PATCH  | `/currencies/:id` | Update currency information.                                         |
| DELETE | `/currencies/:id` | Delete a currency by ID. (ADMIN role required).                      |

## Future Improvements

- Add **unit and integration tests** for all modules to ensure reliability and maintainability.
- **Dockerize** the application for consistent environments across development, staging, and production.  


