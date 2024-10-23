Here is the README content tailored for your project, excluding the API endpoints section:

```markdown
# Grocery and Order Management API

This project is a **Grocery and Order Management API** built using **NestJS**. It provides endpoints to manage grocery items, grocery lists, and orders. The application follows a modular structure with controllers, services, repositories, and a message queue using RabbitMQ for handling order-related events.

## Project Structure

```bash
src
├── app
│   ├── modules
│   │   ├── api
│   │   │   ├── item
│   │   │   │   ├── controller
│   │   │   │   │   └── item.controller.ts  # Grocery item-related routes
│   │   │   │   └── item.module.ts          # Item module definition
│   │   │   └── order
│   │   │       └── order.controller.ts     # Order-related routes
│   │   ├── application
│   │   │   ├── item
│   │   │   │   ├── services
│   │   │   │   │   └── item.service.ts     # Service for managing grocery items
│   │   │   │   ├── model
│   │   │   │   │   └── item.dto.ts         # DTO for creating/updating items
│   │   │   └── orders
│   │   │       └── services
│   │   │           └── order.service.ts    # Service for managing orders
│   │   ├── database
│   │   │   └── database.module.ts          # Database connection configurations
│   │   └── infrastructure
│   │       └── repositories
│   │           ├── item.repository.ts      # Item repository for data access
│   │           ├── order.repository.ts     # Order repository for data access
│   ├── rabbitMQ
│   │   ├── rabbit-mq-consumer.ts           # RabbitMQ consumer for handling message events
│   │   └── rabbit-mq-publisher.ts          # RabbitMQ publisher to send messages
│   └── app.module.ts                       # Application module root
└── main.ts                                 # Entry point of the application
```

---

## Installation

To run this project locally, you'll need to follow these steps.

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd <your-repository-directory>
   ```

2. **Install Dependencies**

   Run the following command to install all dependencies:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**

   Create a `.env` file in the root of the project and add the following environment variables:

   ```bash
   DATABASE_URL=<your_database_connection_string>
   RABBITMQ_URL=<your_rabbitmq_url>
   EMAIL_VERIFICATION_QUEUE=email-verification
   ORDER_QUEUE=order-processing
   PORT=3000
   ```

4. **Run the Application**

   To run the application in development mode:

   ```bash
   npm run start:dev
   ```

   The server will be running at `http://localhost:3000`.

## Scripts

- **`npm run build`**: Build the application.
- **`npm run start`**: Start the application.
- **`npm run start:dev`**: Start the application in watch mode (for development).
- **`npm run test`**: Run unit tests.
- **`npm run test:e2e`**: Run end-to-end tests.
- **`npm run lint`**: Run ESLint to check code quality.

---

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: Superset of JavaScript which adds static typing.
- **MongoDB**: NoSQL database for data storage (with Mongoose ODM).
- **RabbitMQ**: A message-broker used for message passing and processing.
- **Jest**: Testing framework for unit and integration tests.
- **Sentry**: For error tracking and logging.
- **Prettier & ESLint**: Tools for code formatting and linting.

---

## Modules

The application is split into different modules, each representing a different functionality:

1. **Item Module**: This module handles all operations related to grocery items.
    - **Controller**: `item.controller.ts`
    - **Service**: `item.service.ts`
    - **Repository**: `item.repository.ts`
    
2. **List Module**: This module manages grocery lists.
    - **Controller**: `list.controller.ts`
    - **Service**: `list-items.service.ts`
    - **Repository**: `items-list.repository.ts`
    
3. **Order Module**: This module manages order creation, updating, and status tracking.
    - **Controller**: `order.controller.ts`
    - **Service**: `order.service.ts`
    - **Repository**: `order.repository.ts`
    - **RabbitMQ Integration**: `rabbit-mq-publisher.ts`, `rabbit-mq-consumer.ts`

4. **RabbitMQ Integration**: This is responsible for handling asynchronous messaging between services.
    - **Publisher**: Publishes messages to the RabbitMQ queue.
    - **Consumer**: Listens for messages from the queue and processes them.

---

## RabbitMQ Integration

The application integrates with **RabbitMQ** for handling order-related events. When an order is created, the order data is published to a queue.

- **Order Queue**: When an order is created, it's published to the queue (`order-processing`).
- **Consumer**: The consumer listens to the order queue and processes the messages asynchronously.

---

## Testing

The project includes **unit tests** and **end-to-end tests**. You can run the tests using:

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
```

## Contributing

Feel free to submit issues or pull requests if you'd like to contribute to this project. 

## License

This project is licensed under the **UNLICENSED** License.
```

---

### Instructions for Saving:

1. Copy the above content.
2. Create a `README.md` file in the root directory of your project.
3. Paste the copied content into the `README.md` file.
4. Save the file.

You can now attach this README to your project!
