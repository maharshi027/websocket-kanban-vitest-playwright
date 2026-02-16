const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: uuidv4(),
    title: "Sample Task 1",
    description: "This is a sample task in To Do",
    column: "todo",
    priority: "high",
    category: "feature",
    attachments: [],
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: "Sample Task 2",
    description: "This task is in progress",
    column: "inprogress",
    priority: "medium",
    category: "bug",
    attachments: [],
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: "Sample Task 3",
    description: "This task is completed",
    column: "done",
    priority: "low",
    category: "enhancement",
    attachments: [],
    createdAt: new Date().toISOString()
  }
];

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.emit('sync:tasks', tasks);

  socket.on('task:create', (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || '',
      column: taskData.column || 'todo',
      priority: taskData.priority || 'medium',
      category: taskData.category || 'feature',
      attachments: taskData.attachments || [],
      createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    io.emit('task:created', newTask);
    console.log('Task created:', newTask.id);
  });

  socket.on('task:update', (taskData) => {
    const taskIndex = tasks.findIndex(t => t.id === taskData.id);
    
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...taskData,
        updatedAt: new Date().toISOString()
      };
      io.emit('task:updated', tasks[taskIndex]);
      console.log('Task updated:', taskData.id);
    } else {
      socket.emit('error', { message: 'Task not found' });
    }
  });

  socket.on('task:move', (data) => {
    const { taskId, newColumn } = data;
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
      tasks[taskIndex].column = newColumn;
      tasks[taskIndex].updatedAt = new Date().toISOString();
      io.emit('task:moved', { taskId, newColumn });
      console.log('Task moved:', taskId, 'to', newColumn);
    } else {
      socket.emit('error', { message: 'Task not found' });
    }
  });

  socket.on('task:delete', (taskId) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      io.emit('task:deleted', taskId);
      console.log('Task deleted:', taskId);
    } else {
      socket.emit('error', { message: 'Task not found' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', tasksCount: tasks.length });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`);
});

module.exports = { app, io };
