# Frontend - React Kanban Board

React-based frontend for the WebSocket Kanban board with drag-and-drop, real-time updates, and comprehensive testing.

## Installation

```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Testing

### Unit & Integration Tests (Vitest)

Run all tests:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

Generate coverage report:
```bash
npm run test:coverage
```

### End-to-End Tests (Playwright)

Install Playwright browsers (first time):
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

**Note:** Backend server must be running for E2E tests.

## Project Structure

```
src/
├── components/
│   ├── KanbanBoard.jsx        # Main board component
│   ├── KanbanBoard.css        # Board styles
│   ├── TaskProgressChart.jsx  # Charts component
│   └── TaskProgressChart.css  # Chart styles
├── tests/
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   ├── e2e/                   # E2E tests
│   └── setup.js               # Test configuration
├── App.jsx                    # Root component
├── App.css                    # Global styles
└── main.jsx                   # Entry point
```

## Key Dependencies

- **React 18** - UI library
- **socket.io-client** - WebSocket client
- **react-beautiful-dnd** - Drag and drop
- **recharts** - Data visualization
- **lucide-react** - Icons
- **vitest** - Unit testing
- **@testing-library/react** - Component testing
- **@playwright/test** - E2E testing

## Features

### Real-time Synchronization
All changes are instantly synced across connected clients via WebSocket.

### Drag & Drop
Tasks can be dragged between columns. Changes are persisted and broadcast to other users.

### Task Management
- Create tasks with title, description, priority, and category
- Update task properties inline
- Delete tasks with confirmation
- Attach files to tasks

### Visualization
- Real-time charts showing task distribution
- Statistics: total tasks, completion percentage
- Bar and pie charts

### Responsive Design
Works on desktop, tablet, and mobile devices.

## Configuration

WebSocket connection is configured in `KanbanBoard.jsx`:

```javascript
const SOCKET_URL = 'http://localhost:3001';
```

Update this URL for production deployment.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- React.memo for component optimization
- useCallback for event handler memoization
- Lazy loading for charts
- Optimized re-renders with proper dependency arrays
