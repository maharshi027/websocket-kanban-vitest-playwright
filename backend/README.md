# Backend - WebSocket Server

Node.js + Express + Socket.IO WebSocket server for the Kanban board.

## Installation

```bash
npm install
```

## Running

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Server Configuration

- **Port:** 3001 (configurable via PORT environment variable)
- **CORS:** Configured to allow requests from `http://localhost:5173`

## WebSocket Events

### Incoming Events (Client → Server)
- `task:create` - Create new task
- `task:update` - Update existing task
- `task:move` - Move task between columns
- `task:delete` - Delete task

### Outgoing Events (Server → Client)
- `sync:tasks` - Send all tasks to newly connected client
- `task:created` - Broadcast newly created task
- `task:updated` - Broadcast task update
- `task:moved` - Broadcast task movement
- `task:deleted` - Broadcast task deletion

## REST Endpoints

- `GET /api/tasks` - Get all tasks (optional, for debugging)
- `GET /health` - Health check endpoint

## Data Structure

Tasks are stored in memory with the following structure:

```javascript
{
  id: string,           // Unique identifier (UUID)
  title: string,        // Task title
  description: string,  // Task description
  column: string,       // 'todo' | 'inprogress' | 'done'
  priority: string,     // 'low' | 'medium' | 'high'
  category: string,     // 'bug' | 'feature' | 'enhancement'
  attachments: array,   // Array of attachment objects
  createdAt: string,    // ISO timestamp
  updatedAt: string     // ISO timestamp (optional)
}
```

## Notes

- Tasks are stored in-memory and will be lost when the server restarts
- For production, integrate a database (MongoDB, PostgreSQL, etc.)
- Consider adding authentication and rate limiting for production use
