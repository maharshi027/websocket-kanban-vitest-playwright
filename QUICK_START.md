# ⚡ Quick Start Guide

Get the Kanban board up and running in 5 minutes!

## 📋 Prerequisites Checklist

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
cd websocket-kanban-vitest-playwright

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install

# Install Playwright browsers (for E2E tests)
npx playwright install
```

### Step 2: Start Servers

**Open TWO terminal windows:**

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
✅ You should see: `🚀 WebSocket server running on port 3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ You should see: `➜  Local:   http://localhost:5173/`

### Step 3: Open Browser

Go to: **http://localhost:5173**

## ✅ Verify It Works

You should see:
- 🟢 "Connected" status indicator (green)
- Three columns: To Do, In Progress, Done
- Sample tasks in the board
- Task progress charts at the top

## 🧪 Run Tests

### Quick Test (3 commands)

```bash
cd frontend

# Run all unit & integration tests
npm test

# Run E2E tests (servers must be running!)
npm run test:e2e
```

## 📁 Project Structure

```
websocket-kanban-vitest-playwright/
├── backend/              # Node.js server
│   ├── server.js        # WebSocket server
│   └── package.json     
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # React components
│   │   └── tests/       # All tests
│   └── package.json
└── README.md            # Full documentation
```

## 🎯 Try These Features

1. **Create a Task**: Click "Add Task" button
2. **Drag Task**: Drag tasks between columns
3. **Delete Task**: Click trash icon on any task
4. **Change Priority**: Use dropdown on task card
5. **Upload File**: Click "Attach file" on any task
6. **View Charts**: Scroll to see progress visualization

## 🔧 Common Issues

### Port Already in Use?
```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Not Connected?
- Check backend terminal - server should be running
- Refresh the browser
- Check browser console for errors

### Tests Failing?
- Ensure all dependencies installed: `npm install`
- For E2E tests, both servers must be running
- Try: `npm run test:e2e:ui` for interactive testing

## 📚 Full Documentation

- **README.md** - Complete project documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **TESTING_GUIDE.md** - Comprehensive testing guide
- **PROJECT_OVERVIEW.md** - Technical deep dive

## 💡 Development Tips

### Making Changes
1. Edit files in `frontend/src/` or `backend/`
2. Changes auto-reload (hot reload enabled)
3. Check browser/terminal for updates

### File Locations
- **Backend**: `backend/server.js`
- **Main Component**: `frontend/src/components/KanbanBoard.jsx`
- **Tests**: `frontend/src/tests/`
- **Styles**: `frontend/src/components/*.css`

## 🎓 Next Steps

Once running:
1. ✅ Explore all features
2. ✅ Review the code
3. ✅ Run all tests
4. ✅ Read full documentation
5. ✅ Start building your own features!

---

**Need more help?** Check SETUP_GUIDE.md for detailed troubleshooting.

**Ready to code?** See CONTRIBUTING.md for development guidelines.

**Want to understand the tech?** Read PROJECT_OVERVIEW.md for architecture details.
