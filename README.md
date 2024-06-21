# Backend - Trading API

## Overview

This project is a Node.js backend API for a trading application. It connects to the TradeLocker API to fetch tradable instruments and place orders on an OspreyFX account.


## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Technical Stack

- Node.js
- TypeScript
- Express


## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies:

### Running the Application

1. Start the application:
2. run `npm start` to start the app in development mode
3. The server will start on the specified port in the `.env` file, and you can begin interacting with the API.

## Project Structure

src/middlewares: Contains middleware functions for error handling, authentication, and request processing.
src/routes: Contains route definitions for handling API requests.
src/services: Contains service functions for interacting with the TradeLocker API.

## API Endpoints

/trades
GET /trades
Fetch a list of tradable instruments.

POST /trades/place-order
Place a new order.

/account
GET /account
Fetch account details.

## Error Handling

The project uses custom error handling middleware to manage errors and send appropriate responses to the client.

## Authentication

The attachAccessToken middleware is used to attach a valid access token to requests, refreshing the token if necessary.
