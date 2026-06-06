# 🛒 Grocery Service

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?logo=rabbitmq&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![CI](https://github.com/nayefserag/Grocery/actions/workflows/ci.yml/badge.svg)

A **NestJS microservice** that manages grocery items, shopping lists, and customer orders inside a larger microservices ecosystem. It owns grocery business logic and coordinates with **Auth** and **Notification** services over HTTP and **RabbitMQ**.

## ✨ Features

- 🧺 CRUD for grocery items, shopping lists, and orders
- 🔄 Order lifecycle & status tracking
- 📨 Event-driven inter-service communication via RabbitMQ
- 🔐 JWT validation against an external Auth service
- 🔔 Order notifications through a Notification service (RabbitMQ + HTTP)
- 📈 Structured logging (Winston) and error tracking (Sentry)

## 🏗️ Architecture

Layered / clean-architecture structure under `src/app/modules`:

```
modules/
├── api/             # Controllers & HTTP layer
├── application/     # Use cases / business logic
├── database/        # Entities, repositories (TypeORM / Mongoose)
├── infrastructure/  # External integrations, config
├── rabbitmq/        # Producers & consumers
└── shared/          # Cross-cutting utilities
```

## 🧰 Tech Stack

| Area | Tech |
|------|------|
| Framework | NestJS |
| Language | TypeScript |
| Databases | MySQL (TypeORM), MongoDB (Mongoose) |
| Messaging | RabbitMQ |
| Auth | JWT |
| Observability | Winston, Sentry |
| Testing | Jest |

## 🚀 Getting Started

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env   # set DB, RabbitMQ, JWT, and service URLs

# 3. Run
npm run start:dev      # watch mode
npm run start:prod     # production
```

A Postman collection (`postman_collection.json`) is included for trying the API.

## 🧪 Testing

```bash
npm test           # unit tests
npm run test:e2e   # end-to-end
npm run test:cov   # coverage
```

## 📄 License

MIT

---

<sub>If this project helped you, consider giving it a ⭐</sub>

<sub>Built with ❤️ — contributions welcome.</sub>
