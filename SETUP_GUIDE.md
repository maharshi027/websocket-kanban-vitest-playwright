# 📘 Setup Guide for Candidates

This guide will help you set up and run the WebSocket-powered Kanban board project.

## 🎯 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

## 📦 Step-by-Step Setup

### Step 1: Navigate to Project Directory

```bash
cd websocket-kanban-vitest-playwright
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- express
- socket.io
- cors
- uuid
- nodemon (dev dependency)

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

This will install:
- React and React DOM
- Vite (build tool)
- Socket.IO client
- react-beautiful-dnd (drag & drop)
- recharts (charts)
- Testing libraries (Vitest, Playwright, React Testing Library)

**Note:** Installation may take a few minutes depending on your internet connection.

### Step 4: Install Playwright Browsers (for E2E tests)

```bash
npx playwright install
```

This downloads the necessary browsers for E2E testing.

## 🚀 Running the Application

You need to run BOTH servers simultaneously. Use two terminal windows:

### Terminal 1: Backend Server

```bash
cd backend
npm start
```

You should see:
```
🚀 WebSocket server running on port 3001
```

**Keep this terminal running!**

### Terminal 2: Frontend Development Server

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 5: Open Your Browser

Navigate to: `http://localhost:5173`

You should see the Kanban board with:
- ✅ A header showing "Kanban Board"
- ✅ Connection status indicator (should show "🟢 Connected")
- ✅ Three columns: To Do, In Progress, Done
- ✅ Sample tasks already loaded
- ✅ Task progress charts at the top

## ✅ Verify Everything Works

### Test 1: Connection Status
- Check if the status indicator shows "🟢 Connected"
- If disconnected, ensure the backend server is running

### Test 2: Create a Task
1. Click "Add Task" button
2. Fill in task details
3. Click "Add Task" in the modal
4. Task should appear in the board

### Test 3: Move a Task
1. Drag a task from one column to another
2. Task should move smoothly
3. Charts should update automatically

### Test 4: Real-time Updates (Optional)
1. Open the app in two browser tabs
2. Create or move a task in one tab
3. Changes should appear instantly in the other tab

## 🧪 Running Tests

### Unit & Integration Tests

In the frontend directory:

```bash
npm test
```

This runs Vitest tests. You should see test results in the terminal.

For interactive testing UI:
```bash
npm run test:ui
```

### E2E Tests

**Important:** Make sure both backend and frontend servers are running!

In the frontend directory:
```bash
npm run test:e2e
```

For interactive E2E testing:
```bash
npm run test:e2e:ui
```

## 🐛 Troubleshooting

### Problem: "Port 3001 is already in use"

**Solution:**
```bash
# On Mac/Linux
lsof -ti:3001 | xargs kill -9

# On Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Problem: "Port 5173 is already in use"

**Solution:**
```bash
# On Mac/Linux
lsof -ti:5173 | xargs kill -9

# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Problem: "Cannot connect to WebSocket server"

**Solutions:**
1. Ensure backend server is running on port 3001
2. Check for firewall blocking the connection
3. Verify CORS settings in `backend/server.js`
4. Clear browser cache and reload

### Problem: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem: Tests are failing

**Solutions:**
1. Ensure all dependencies are installed
2. For E2E tests, make sure both servers are running
3. Run `npx playwright install` to ensure browsers are installed
4. Clear test cache: `npm test -- --clearCache`

### Problem: Drag and drop not working

**Solution:**
1. Ensure you're using a supported browser (Chrome, Firefox, Safari, Edge)
2. Try refreshing the page
3. Check browser console for errors

## 📱 Testing on Different Devices

### Desktop
- Open `http://localhost:5173` in your browser

### Mobile (same network)
1. Find your computer's IP address:
   - Mac: System Preferences → Network
   - Windows: `ipconfig`
   - Linux: `ifconfig`

2. On your mobile device, open:
   `http://YOUR_IP_ADDRESS:5173`

**Note:** Ensure your firewall allows connections on port 5173.

## 🎓 Development Workflow

### Making Changes

1. Edit files in `frontend/src/` or `backend/`
2. Vite and nodemon will auto-reload
3. Check browser for updates
4. Run tests to verify changes

### Creating New Components

```bash
cd frontend/src/components
# Create your component file
touch MyComponent.jsx
touch MyComponent.css
```

### Adding New Tests

```bash
cd frontend/src/tests
# For unit tests
touch unit/myTest.test.js
# For integration tests
touch integration/myTest.test.jsx
# For E2E tests
touch e2e/myTest.spec.js
```

## 📚 Additional Resources

### Learning Materials
- [React Documentation](https://react.dev/)
- [Socket.IO Guide](https://socket.io/docs/v4/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)

### Project Documentation
- Main README: `../README.md`
- Backend README: `../backend/README.md`
- Frontend README: `./README.md`

## ✨ Tips for Success

1. **Read the README files** - They contain important information
2. **Start with existing code** - Understand how things work before making changes
3. **Test frequently** - Run tests after making changes
4. **Use browser DevTools** - Inspect WebSocket connections and debug issues
5. **Check console logs** - Both browser and terminal logs provide helpful information
6. **Commit often** - Use git to track your changes
7. **Ask questions** - If stuck, review documentation or seek help

## 🎯 Next Steps

Once everything is set up and working:

1. ✅ Explore the codebase
2. ✅ Try all features (create, update, delete, move tasks)
3. ✅ Run all tests and ensure they pass
4. ✅ Review the code structure and components
5. ✅ Read the evaluation criteria in the candidate guide
6. ✅ Start implementing additional features or improvements

## 📝 Checklist

Before starting development, ensure:

- [ ] Node.js is installed
- [ ] Backend dependencies are installed
- [ ] Frontend dependencies are installed
- [ ] Playwright browsers are installed
- [ ] Backend server starts successfully
- [ ] Frontend server starts successfully
- [ ] Application loads in browser
- [ ] WebSocket connection is established
- [ ] All unit/integration tests pass
- [ ] E2E tests can run
- [ ] You understand the project structure

---

**Good luck with your assessment! 🚀**

If you encounter any issues not covered in this guide, check the troubleshooting section or review the error messages carefully.
