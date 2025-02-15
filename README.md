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

