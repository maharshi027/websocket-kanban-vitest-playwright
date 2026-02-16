# 📝 WebSocket-Powered Kanban Board

A real-time collaborative Kanban board built with React, Node.js, and WebSockets. This project demonstrates full-stack development skills including real-time communication, drag-and-drop functionality, file uploads, data visualization, and comprehensive testing.

## 🌟 Features

- ✅ **Real-time Updates** - Changes sync instantly across all connected clients using Socket.IO
- ✅ **Drag & Drop** - Intuitive task management with react-beautiful-dnd
- ✅ **Task Management** - Create, update, delete, and move tasks between columns
- ✅ **Priority & Categories** - Assign priorities (Low/Medium/High) and categories (Bug/Feature/Enhancement)
- ✅ **File Attachments** - Upload and attach files to tasks with preview support
- ✅ **Progress Visualization** - Interactive charts showing task distribution and completion rates
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Comprehensive Testing** - Unit tests (Vitest), integration tests, and E2E tests (Playwright)

## 🏗️ Project Structure

```
websocket-kanban-vitest-playwright/
├── backend/                      # Node.js WebSocket server
│   ├── server.js                 # Express + Socket.IO setup
│   └── package.json              
│
├── frontend/                     # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── KanbanBoard.jsx         # Main Kanban component
│   │   │   ├── KanbanBoard.css         
│   │   │   ├── TaskProgressChart.jsx   # Data visualization
│   │   │   └── TaskProgressChart.css   
│   │   ├── tests/
│   │   │   ├── unit/                   # Unit tests (Vitest)
│   │   │   ├── integration/            # Integration tests (Vitest)
│   │   │   ├── e2e/                    # E2E tests (Playwright)
│   │   │   └── setup.js                
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── playwright.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd websocket-kanban-vitest-playwright
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

You need to run both the backend and frontend servers:

#### Terminal 1 - Start Backend Server
```bash
cd backend
npm start
```
The backend server will start on `http://localhost:3001`

#### Terminal 2 - Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173` to see the application.

## 🧪 Testing

### Unit & Integration Tests (Vitest)

Run all unit and integration tests:
```bash
cd frontend
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

Run tests with coverage:
```bash
npm run test:coverage
```

### End-to-End Tests (Playwright)

Install Playwright browsers (first time only):
```bash
npx playwright install
```

Run E2E tests:
```bash
npm run test:e2e
```

Run E2E tests with UI:
```bash
npm run test:e2e:ui
```

**Important:** Make sure both backend and frontend servers are running before executing E2E tests.

## 📊 Test Coverage

The project includes comprehensive test coverage:

### Unit Tests (`src/tests/unit/`)
- Task creation, update, delete operations
- Task movement between columns
- Data validation (priority, category, column)
- Attachment handling

### Integration Tests (`src/tests/integration/`)
- KanbanBoard component rendering
- WebSocket connection handling
- User interactions (add task, delete task)
- Form validation
- Modal behavior

### E2E Tests (`src/tests/e2e/`)
- Complete user workflows
- Drag and drop functionality
- Real-time synchronization
- File upload testing
- Chart visualization
- Responsive design validation

## 🔌 WebSocket Events

The application uses the following Socket.IO events:

### Client → Server
- `task:create` - Create a new task
- `task:update` - Update task properties
- `task:move` - Move task between columns
- `task:delete` - Delete a task

### Server → Client
- `sync:tasks` - Initial task synchronization
- `task:created` - Broadcast new task to all clients
- `task:updated` - Broadcast task update
- `task:moved` - Broadcast task movement
- `task:deleted` - Broadcast task deletion

## 🎨 UI Components

### KanbanBoard
Main component managing the board state and WebSocket connections.

**Features:**
- Three columns: To Do, In Progress, Done
- Drag & drop support
- Real-time updates
- Connection status indicator

### TaskProgressChart
Visualization component showing task statistics.

**Features:**
- Bar chart: Tasks by status
- Pie chart: Task distribution
- Live statistics: Total tasks and completion percentage

### Task Card
Individual task representation with:
- Title and description
- Priority dropdown (Low/Medium/High)
- Category dropdown (Bug/Feature/Enhancement)
- File attachments with preview
- Delete button

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Socket.IO Client** - WebSocket communication
- **react-beautiful-dnd** - Drag and drop functionality
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Vitest** - Unit and integration testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - WebSocket server
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique ID generation

## 📝 API Endpoints

### REST Endpoints (Optional)
- `GET /api/tasks` - Get all tasks
- `GET /health` - Health check

## 🎯 Key Features Implementation

### Real-time Synchronization
All task operations are broadcast to connected clients using Socket.IO, ensuring everyone sees updates instantly.

### Drag & Drop
Tasks can be dragged between columns using react-beautiful-dnd. On drop, a `task:move` event is emitted to sync the change.

### File Attachments
Users can upload files to tasks. Images show a preview, while other files display their name. Files are stored as base64 data URLs (in production, upload to a proper storage service).

### Priority & Category Management
Each task has dropdown selectors for priority and category. Changes are immediately synced via WebSocket.

### Progress Visualization
Charts update in real-time as tasks are created, moved, or deleted, providing instant feedback on project progress.

## 🔒 Best Practices

- **Component Structure** - Modular, reusable components
- **State Management** - React hooks for local state
- **Error Handling** - Graceful error handling for WebSocket failures
- **Testing** - Comprehensive test coverage (unit, integration, E2E)
- **Code Quality** - Clean, documented, and maintainable code
- **Responsive Design** - Mobile-first approach with CSS Grid and Flexbox

## 🐛 Troubleshooting

### WebSocket Connection Failed
- Ensure backend server is running on port 3001
- Check CORS configuration in `backend/server.js`
- Verify firewall settings

### Tests Failing
- Make sure all dependencies are installed
- For E2E tests, ensure both servers are running
- Clear browser cache and restart servers

### Port Already in Use
```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

## 🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Task comments and activity log
- [ ] Due dates and reminders
- [ ] Search and filter functionality
- [ ] Dark mode support
- [ ] Export tasks to CSV/JSON
- [ ] Collaborative editing with user presence indicators
- [ ] Task assignment to team members
- [ ] Email notifications

## 📚 References

- [Socket.IO Documentation](https://socket.io/docs/)
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- [Recharts](https://recharts.org/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [Vite](https://vitejs.dev/)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a technical assessment project demonstrating full-stack development, real-time communication, and comprehensive testing practices.

---

**Happy Coding! 🚀**
