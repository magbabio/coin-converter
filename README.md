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

This is a **NestJS** project built with **TypeScript**, **Prisma ORM**, and **PostgreSQL**. **Coin Converter** is a currency conversion platform that automates real-time exchange rate updates through **web scraping with Puppeteer**. The system provides users with accurate conversions, user profile, and a history of their conversions.

## Features

- **Real-Time Exchange Rates**: Automatically retrieves and saves average exchange rates from Binance using Puppeteer web scraping.  
- **Currency Management**: Create, update, and retrieve currency data with full validation and conflict handling.  
- **Favorite Currencies**: Users can mark currencies as favorites and retrieve their personalized lists.  
- **Automated Scraping**: CRON jobs execute background scraping tasks to keep exchange rates up to date.  
- **User Management**: User creation, update, and deletion with hashed passwords using bcrypt.  
- **Validation**: All modules implement DTO validation and custom exceptions.  

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
├── config/                           # Users module
├── conversion/                       # Conversion module
├── currencies/                       # Currencies module
├── favorite-currencies/              # Favorite currencies module
├── prisma/                           # Prisma ORM configuration and database access
├── scraper/                          # Puppeteer-based web scraping for exchange rates
├── users/                            # Users module
├── app.module.ts                     # Root module
└── main.ts                           # Application entry point

```
## Future Improvements

- Implement role-based access control (RBAC) for better security.
- Add more comprehensive unit and integration tests.
- Dockerize the Application to simplify deployment and ensure consistent environments across development, staging, and production.  


