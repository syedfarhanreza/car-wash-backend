# CAR-WASH-BACKEND
This project is an Express application built with TypeScript, integrating MongoDB using Mongoose for effective data management. It ensures data integrity through validation using Zod.

## Features

- Express server with TypeScript.
- MongoDB integration using Mongoose.
- Modules for Product and Order with appropriate data types and validations.
- Data integrity validation using Zod.
- RESTful API endpoints for managing products and orders.

## Prerequisites

- Node.js (v20.12.12 recommended)
- MongoDB (running instance or MongoDB Atlas)
- npm
- Git

# Installation 
## Clone the repository
```sh
 git clone  https://github.com/syedfarhanreza/car-wash-backend.git
 cd car-wash-backend
```

## Install dependencies
Open the project file in the terminal and run `npm install`
```sh
npm install
```

## Set up environment variables
Create a `.env`  file in the root directory and add the following:
```sh
MONGO_URI=your_mongo_db_connection_string
PORT=5000
NODE_ENV="development"
BCRYPT_SALT_ROUNDS= add number of rounds (ex- 8,12)
JWT_ACCESS_SECRET= create jwt secret token
```

## Start the server
```sh
npm run start:dev
```
