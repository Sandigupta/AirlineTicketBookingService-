# Booking Service

This microservice is responsible for handling flight bookings within a larger, microservices-based airline booking system.

## Related Microservices

This service operates within an ecosystem of interconnected microservices that form the backbone of the airline booking system. Below are other critical services within the ecosystem:

- **[Authentication Service](https://github.com/Sandigupta/authentication_service-)**  
  Manages user registration, login, and authentication logic, utilizing JWT for secure access and role-based access control.

- **[Flight & Search Service](https://github.com/Sandigupta/FlightsAndSearchService)**  
  Handles flight listings, availability checks, and provides flight search and filter functionalities.

- **[Reminder Service](https://github.com/Sandigupta/REMINDER_SERVICE)**  
  Sends booking reminders and notifications, implementing RabbitMQ for event-driven messaging.

- **[API Gateway](https://github.com/Sandigupta/API_GATEWAYS-)**  
  Serves as the entry point for all client requests, routing traffic to the appropriate services and handling shared gateway tasks.

---

## Tech Stack

The following technologies and frameworks are used in this project:

- **Node.js** - For non-blocking, event-driven I/O.
- **Express** - A minimal and flexible Node.js web application framework.
- **Sequelize ORM** - An easy-to-use ORM for relational databases.
- **MySQL / PostgreSQL** - Supported databases, configurable to suit your needs.
- **RabbitMQ** - Message broker used for reliable, asynchronous messaging.

---

## Getting Started

To set up this project in your local development environment, follow these steps:

---

### 1. Clone the Repository

Clone the repository and navigate to the project directory:

```bash
git clone <your-repo-url>
cd <project-directory>
```

---

### 2. Install Dependencies

Install the necessary dependencies by running the following command:

```bash
npm install
```

---

### 3. Environment Configuration

Create a `.env` file in the root of the project directory and configure the following environment variables:

```env
PORT=3000

# External Services
FLIGHT_SERVICE_PATH=http://localhost:4000

# RabbitMQ / Message Broker
EXCHANGE_NAME=reminder_exchange
REMINDER_BINDING_KEY=reminder_key
MESSAGE_BROKER_URL=amqp://localhost
```

> Ensure that the values are adjusted based on your local or production environment.

---

### 4. Database Configuration

Initialize Sequelize by navigating to the `src` directory and running:

```bash
cd src
npx sequelize init
```

This will generate the following directory structure:

- `config/config.json`
- `models/`
- `migrations/`
- `seeders/`

Update the `config/config.json` file with your database credentials:

```json
"development": {
  "username": "your_db_username",
  "password": "your_db_password",
  "database": "your_db_name",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
```

> If using a database other than MySQL (e.g., PostgreSQL or MariaDB), replace `mysql` with the appropriate dialect.

---

### 5. Run the Application

Navigate back to the project root and start the application with the following command:

```bash
npm run dev
```

The application will be accessible at `http://localhost:<PORT>`.

---

## Key Endpoint

The service exposes the following route for booking creation:

```js
routes.post('/bookings', bookingController.create);
```

This route accepts booking data and triggers the appropriate controller logic to process and store the booking.

---

## Testing the API

You can test the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

### Example Request:

```http
POST /bookings
Content-Type: application/json

{
  "flightId": "1234",
  "userId": "5678",
  "seats": 2
}
```

---

## Folder Structure (Simplified)

The project's folder structure is organized as follows:

```
project-root/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── services/
├── .env
├── package.json
└── README.md
```

---

## Feedback & Contributions

We welcome feedback and contributions:

- Found a bug? Open an [issue](https://github.com/Sandigupta/AirlineTicketBookingService-/issues).
- Want to contribute? Submit a [pull request](https://github.com/Sandigupta/AirlineTicketBookingService-/pulls).

---

## Author

Maintained by [Sandeep Gupta](https://github.com/Sandigupta).

---





































































<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>





----

# **Sequelize Model Guide**

## Introduction
Sequelize is a powerful ORM for Node.js that allows you to interact with SQL databases using JavaScript. The `Model` in Sequelize represents a table in your database and provides an abstraction layer to perform database operations easily.

For detailed information, refer to the official documentation: [Sequelize Model Basics](https://sequelize.org/docs/v6/core-concepts/model-basics/).

## Installing Sequelize
Ensure you have Sequelize and the appropriate database driver installed. Use the following command:

```sh
npm install sequelize pg # For PostgreSQL
tnpm install sequelize mysql2 # For MySQL
tnpm install sequelize sqlite3 # For SQLite
```

## Defining a Model
To define a model in Sequelize, use the `sequelize.define` method or extend the `Model` class:

### Using `sequelize.define`
```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
```

### Using `Model` Class
```javascript
const { Model } = require('sequelize');

class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);
```

## Synchronizing Models
To sync models with the database:
```javascript
sequelize.sync({ force: true }) // WARNING: This will drop existing tables
  .then(() => {
    console.log('Database & tables created!');
  });
```

## CRUD Operations
### Creating a Record
```javascript
await User.create({ username: 'john_doe', email: 'john@example.com' });
```

### Reading Data
```javascript
const users = await User.findAll();
console.log(users);
```

### Updating Data
```javascript
await User.update({ email: 'newemail@example.com' }, { where: { username: 'john_doe' } });
```

### Deleting Data
```javascript
await User.destroy({ where: { username: 'john_doe' } });
```

## Conclusion
Sequelize models simplify database interactions by providing a structured way to define and manipulate data. For more details, visit the [Sequelize Model Basics](https://sequelize.org/docs/v6/core-concepts/model-basics/) documentation.


---
---

# **Sequelize Migrations**

## Introduction
Sequelize provides a powerful migration system that allows you to manage database schema changes over time. Migrations help maintain a version-controlled database structure, making it easy to track and apply schema updates in a structured manner.

## Prerequisites
- Node.js installed
- Sequelize CLI installed globally or locally (`npm install --save-dev sequelize-cli`)
- A configured Sequelize project with a `config/config.json` file containing database connection details.

## Setting Up Migrations

1. **Initialize Sequelize** (if not already initialized):
   ```sh
   npx sequelize-cli init
   ```
   This creates the following folder structure:
   ```
   ├── migrations
   ├── models
   ├── seeders
   ├── config/config.json
   ```

2. **Create a Migration**:
   ```sh
   npx sequelize-cli migration:generate --name create-users-table
   ```
   This generates a migration file inside the `migrations` directory.

## Writing a Migration
A migration file contains two functions: `up` (for applying changes) and `down` (for reverting changes).

Example `migrations/YYYYMMDDHHMMSS-create-users-table.js`:
```js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
```

## Running Migrations
Apply all pending migrations:
```sh
npx sequelize-cli db:migrate
```

Rollback the last migration:
```sh
npx sequelize-cli db:migrate:undo
```

Rollback all migrations:
```sh
npx sequelize-cli db:migrate:undo:all
```

## Seeding Data
To populate your database with initial data:
```sh
npx sequelize-cli seed:generate --name seed-users
```
Example `seeders/YYYYMMDDHHMMSS-seed-users.js`:
```js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { name: 'John Doe', email: 'john@example.com', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
```
Run the seeder:
```sh
npx sequelize-cli db:seed:all
```

## Managing Migrations
- List executed migrations:
  ```sh
  npx sequelize-cli db:migrate:status
  ```
- Reverting specific migrations:
  ```sh
  npx sequelize-cli db:migrate:undo --name YYYYMMDDHHMMSS-migration-name.js
  ```

## Conclusion
Migrations in Sequelize allow structured and version-controlled database schema management. They help developers maintain consistency across environments, making collaboration easier in larger teams.

For more details, visit the official Sequelize documentation: [Sequelize Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)

