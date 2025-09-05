# Booking Service

This microservice is responsible for handling flight bookings within a larger, microservices-based airline booking system.
<img width="1520" height="803" alt="Image" src="https://github.com/user-attachments/assets/c61b0d9f-3e3a-4872-b1c3-5c4a34a2c3ef" />

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


