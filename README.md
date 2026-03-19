<div align="center">

# 🖥️ Codeus

**Real-time collaborative coding — built for teams, rooms, and flow.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Hono](https://img.shields.io/badge/Hono-Backend-orange?style=flat-square)](https://hono.dev/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=flat-square&logo=socket.io)](https://socket.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square)](https://orm.drizzle.team/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Architecture](#-architecture) · [Contributing](#-contributing)

</div>

---

## ✨ Features

- 🔐 **Authentication** — Secure login and logout powered by Supabase Auth
- 🏠 **Rooms** — Create multiple rooms, each with a unique invite code
- 🤝 **Join via Invite** — Share your invite code and let friends jump straight into your room
- 🎨 **Multiple Canvases** — Each room supports multiple named canvases for organizing work
- ⚡ **Real-time Collaboration** — Live code sync across all connected devices using WebSockets & Socket.io
- 👥 **Presence Awareness** — See who's active in a room and which canvas they're editing
- 🌙 **Dark / Light Mode** — Easy on the eyes, day or night

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | [Next.js](https://nextjs.org/) (App Router) |
| **Backend** | [Hono](https://hono.dev/) |
| **Real-time** | [Socket.io](https://socket.io/) + WebSocket |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **Auth** | [Supabase Auth](https://supabase.com/auth) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) |

---

## 📁 Project Structure

```
codeus/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/
│   │   │   ├── (auth)/         # Login / signup pages
│   │   │   ├── dashboard/      # User's rooms overview
│   │   │   ├── room/[id]/      # Room page with canvases
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── canvas/         # Code editor canvas components
│   │   │   ├── room/           # Room management UI
│   │   │   └── ui/             # Shared UI components
│   │   └── lib/
│   │       ├── socket.ts       # Socket.io client setup
│   │       └── supabase.ts     # Supabase client
│   │
│   └── server/                 # Hono backend
│       ├── src/
│       │   ├── routes/
│       │   │   ├── auth.ts
│       │   │   ├── rooms.ts
│       │   │   └── canvases.ts
│       │   ├── socket/
│       │   │   └── handlers.ts # Socket.io event handlers
│       │   ├── db/
│       │   │   ├── schema.ts   # Drizzle schema
│       │   │   └── index.ts    # DB connection
│       │   └── index.ts        # Hono app entry point
│       └── drizzle.config.ts
│
├── packages/
│   └── shared/                 # Shared types & utils
├── .env.example
└── package.json                # Monorepo root
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- PostgreSQL database (local or hosted)
- A [Supabase](https://supabase.com/) project

### 1. Clone the repository

```bash
git clone https://github.com/your-username/codeus.git
cd codeus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/codeus

# Server
PORT=3001
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### 4. Run database migrations

```bash
npm run db:generate
npm run db:migrate
```

### 5. Start the development servers

```bash
# Start both frontend and backend
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🏗 Architecture

```
┌─────────────────────────────────┐
│         Next.js Frontend        │
│  (App Router + Socket.io Client)│
└────────────┬────────────────────┘
             │  HTTP (REST)  │  WebSocket
             ▼               ▼
┌─────────────────────────────────┐
│         Hono Backend            │
│  ┌─────────────┐ ┌───────────┐  │
│  │  REST API   │ │ Socket.io │  │
│  │  /rooms     │ │  Server   │  │
│  │  /canvases  │ │           │  │
│  └──────┬──────┘ └─────┬─────┘  │
└─────────│──────────────│────────┘
          │              │
          ▼              ▼
┌─────────────────────────────────┐
│    PostgreSQL via Drizzle ORM   │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│       Supabase Auth             │
└─────────────────────────────────┘
```

### Real-time Flow

1. User opens a canvas inside a room
2. Next.js client connects to the Socket.io server with their `roomId` and `canvasId`
3. Keystrokes emit `canvas:update` events to the server
4. Server broadcasts the delta to all other clients in the same canvas channel
5. Each client applies the update — no full page reload needed

---

## 📡 Socket Events

| Event | Direction | Description |
|---|---|---|
| `room:join` | Client → Server | Join a room's socket channel |
| `room:leave` | Client → Server | Leave a room's channel |
| `canvas:join` | Client → Server | Subscribe to a specific canvas |
| `canvas:update` | Client → Server | Send a code change delta |
| `canvas:update` | Server → Client | Broadcast delta to peers |
| `presence:update` | Server → Client | Who is currently in the room |

---

## 🔑 API Endpoints

```
POST   /api/auth/logout          # Log out current user

GET    /api/rooms                # List user's rooms
POST   /api/rooms                # Create a new room
GET    /api/rooms/:id            # Get room details
POST   /api/rooms/join           # Join room via invite code
DELETE /api/rooms/:id            # Delete a room

GET    /api/rooms/:id/canvases         # List canvases in a room
POST   /api/rooms/:id/canvases         # Create a new canvas
GET    /api/rooms/:id/canvases/:cid    # Get canvas content
PATCH  /api/rooms/:id/canvases/:cid    # Update canvas content
DELETE /api/rooms/:id/canvases/:cid    # Delete a canvas
```

---

## 🗄 Database Schema (Drizzle)

```ts
// Core tables
users        → id, email, name, avatar_url, created_at
rooms        → id, name, invite_code, owner_id, created_at
room_members → room_id, user_id, joined_at
canvases     → id, room_id, name, content, language, created_at, updated_at
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) spec for commit messages.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by the Codeus team
</div>