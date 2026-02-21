# QuantumDesk Mini

A minimal real-time helpdesk system built with **Next.js, Prisma, PostgreSQL, and Socket.IO**.

This project demonstrates core helpdesk functionality including ticket creation, threaded conversations, and real-time messaging between customers and agents.

It was built as part of a take-home interview assignment and focuses on correctness, clean architecture, and real-time communication rather than UI styling.

---

# Features

## Core Features

* Create support tickets
* View ticket list
* View ticket details with conversation thread
* Send messages within tickets
* Update ticket status
* Real-time messaging using Socket.IO (no refresh required)

## Real-time Capabilities

* Messages appear instantly for all connected clients
* Room-based architecture (per-ticket subscriptions)
* Efficient event broadcasting (no unnecessary payloads)

## Architecture Highlights

* Next.js App Router
* PostgreSQL database
* Prisma ORM with migrations
* Repository → Service → API layered architecture
* Socket.IO realtime server (separate process)
* Zod validation layer
* Clean separation of concerns

---

# Tech Stack

## Frontend

* Next.js 16
* React 19
* TypeScript

## Backend

* Next.js Route Handlers
* Prisma ORM
* PostgreSQL
* Socket.IO

## Database

* PostgreSQL
* Prisma migrations

## Realtime

* Socket.IO server
* Room-based event subscriptions

## Validation

* Zod

## Tooling

* pnpm
* tsx
* ESLint
* Tailwind (installed, minimal usage)

---

# Project Structure

```
app/
  api/                # API routes
  (customer)/        # Customer portal pages

lib/
  db/                # Prisma client
  repositories/      # Database access layer
  services/          # Business logic layer
  realtime/          # Socket client and hooks
  validations/       # Zod validation schemas

prisma/
  schema.prisma
  migrations/
  seed.ts

realtime/
  server.ts          # Socket.IO server

generated/
  prisma/            # Generated Prisma client
```

---

# Prerequisites

Install the following:

* Node.js 18+
* pnpm
* Docker (recommended for PostgreSQL)

Install pnpm if not installed:

```
npm install -g pnpm
```

---

# Setup Instructions

## 1. Clone repository

```
git clone <your-repo-url>
cd quantum-desk-mini
```

---

## 2. Install dependencies

```
pnpm install
```

---

## 3. Start PostgreSQL

Using Docker:

```
docker run --name quantumdesk-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=quantumdesk \
  -p 5432:5432 \
  -d postgres
```

---

## 4. Configure environment variables

Create `.env` file in root:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/quantumdesk"
```

---

## 5. Run Prisma migrations

```
pnpm prisma migrate dev
```

---

## 6. Generate Prisma client

```
pnpm prisma generate
```

---

## 7. Seed database (optional but recommended)

```
pnpm tsx prisma/seed.ts
```

This creates:

* 1 agent user
* 1 customer user
* 1 sample ticket
* 1 sample message

---

# Running the Application

You must run **two processes**:

---

## Terminal 1 — Next.js app

```
pnpm dev
```

Runs on:

```
http://localhost:3000
```

---

## Terminal 2 — Realtime Socket.IO server

```
pnpm socket
```

Runs on:

```
http://localhost:3001
```

---

# Using the App

## Customer flow

1. Open browser:

```
http://localhost:3000
```

2. Navigate to Tickets
3. Create a ticket
4. Open the ticket
5. Send messages

---

## Realtime test

Open the same ticket in two browser tabs.

Send a message in one tab → appears instantly in the other.

---

# Database Schema

Core tables:

* users
* tickets
* messages

Relationships:

* User → Tickets (created, assigned)
* Ticket → Messages
* User → Messages

Indexes added for performance:

* tickets(status, updatedAt)
* messages(ticketId, createdAt)

---

# Scripts

```
pnpm dev        # Run Next.js app
pnpm build      # Build app
pnpm start      # Start production build
pnpm socket     # Run Socket.IO server
pnpm lint       # Run ESLint
```

---

# Libraries Used

| Library          | Purpose                    |
| ---------------- | -------------------------- |
| next             | Full-stack React framework |
| react            | Frontend library           |
| prisma           | ORM                        |
| @prisma/client   | Prisma database client     |
| pg               | PostgreSQL driver          |
| socket.io        | Realtime server            |
| socket.io-client | Realtime client            |
| zod              | Validation                 |
| tsx              | Run TypeScript scripts     |
| dotenv           | Environment variables      |

---

# Realtime Design

Socket.IO server runs as a separate process.

Clients join ticket-specific rooms:

```
join-ticket → ticketId
```

Events emitted:

```
message:created
ticket:updated
```

This ensures efficient realtime updates.

---

# Architectural Notes

The project follows layered architecture:

* Repository layer → database access
* Service layer → business logic
* API layer → HTTP interface
* Realtime layer → event broadcasting

This keeps the system modular, testable, and scalable.

---

# What would be done next with more time

* Authentication
* Role-based access control
* Ticket assignment UI
* Pagination for messages
* Redis adapter for Socket.IO scaling
* Multi-tenant support
* Tests

---

# Author

Built as part of QuantumDesk take-home assignment.

---
