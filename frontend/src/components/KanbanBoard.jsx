import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Trash2, Upload, X, Plus } from 'lucide-react';
import io from 'socket.io-client';
import TaskProgressChart from './TaskProgressChart';
import './KanbanBoard.css';

const SOCKET_URL = 'http://localhost:3001';

const COLUMNS = {
  todo: { id: 'todo', title: 'To Do', color: '#e3f2fd' },
  inprogress: { id: 'inprogress', title: 'In Progress', color: '#fff3e0' },
  done: { id: 'done', title: 'Done', color: '#e8f5e9' }
};

const PRIORITIES = ['low', 'medium', 'high'];
const CATEGORIES = ['bug', 'feature', 'enhancement'];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    column: 'todo',
    priority: 'medium',
    category: 'feature'
  });

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    });

    newSocket.on('sync:tasks', (syncedTasks) => {
      setTasks(syncedTasks);
      setLoading(false);
    });

    newSocket.on('task:created', (task) => {
      setTasks(prev => [...prev, task]);
    });

    newSocket.on('task:updated', (updatedTask) => {
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    });

    newSocket.on('task:moved', ({ taskId, newColumn }) => {
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, column: newColumn } : t
      ));
    });

    newSocket.on('task:deleted', (taskId) => {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleAddTask = useCallback(() => {
    if (!newTask.title.trim()) return;
    
    socket.emit('task:create', newTask);
    setNewTask({
      title: '',
      description: '',
      column: 'todo',
      priority: 'medium',
      category: 'feature'
    });
    setShowAddTask(false);
  }, [newTask, socket]);

  const handleDeleteTask = useCallback((taskId) => {
    socket.emit('task:delete', taskId);
  }, [socket]);

  const handleUpdateTask = useCallback((taskId, updates) => {
    const task = tasks.find(t => t.id === taskId);
    socket.emit('task:update', { ...task, ...updates });
  }, [tasks, socket]);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) return;

    socket.emit('task:move', {
      taskId: draggableId,
      newColumn: destination.droppableId
    });
  }, [socket]);

  const handleFileUpload = useCallback((taskId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Simulate file upload - in production, upload to server
    const reader = new FileReader();
    reader.onloadend = () => {
      const task = tasks.find(t => t.id === taskId);
      const newAttachment = {
        name: file.name,
        type: file.type,
        url: reader.result
      };
      
      socket.emit('task:update', {
        ...task,
        attachments: [...(task.attachments || []), newAttachment]
      });
    };
    reader.readAsDataURL(file);
  }, [tasks, socket]);

  const removeAttachment = useCallback((taskId, attachmentIndex) => {
    const task = tasks.find(t => t.id === taskId);
    const newAttachments = task.attachments.filter((_, i) => i !== attachmentIndex);
    socket.emit('task:update', { ...task, attachments: newAttachments });
  }, [tasks, socket]);

  const getTasksByColumn = (columnId) => {
    return tasks.filter(task => task.column === columnId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Connecting to server...</p>
      </div>
    );
  }

  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <h1>📋 Kanban Board</h1>
        <div className="header-actions">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
          <button className="btn-primary" onClick={() => setShowAddTask(true)}>
            <Plus size={20} /> Add Task
          </button>
        </div>
      </header>

      {showAddTask && (
        <div className="modal-overlay" onClick={() => setShowAddTask(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="textarea-field"
              rows="3"
            />
            <div className="form-row">
              <div className="form-group">
                <label>Column</label>
                <select
                  value={newTask.column}
                  onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
                  className="select-field"
                >
                  {Object.values(COLUMNS).map(col => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="select-field"
                >
                  {PRIORITIES.map(p => (
                    <option key={p} value={p}>{p.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="select-field"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowAddTask(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleAddTask}>Add Task</button>
            </div>
          </div>
        </div>
      )}

      <TaskProgressChart tasks={tasks} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {Object.values(COLUMNS).map(column => (
            <div key={column.id} className="kanban-column">
              <div className="column-header" style={{ backgroundColor: column.color }}>
                <h2>{column.title}</h2>
                <span className="task-count">{getTasksByColumn(column.id).length}</span>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  >
                    {getTasksByColumn(column.id).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                          >
                            <div className="task-header">
                              <h3>{task.title}</h3>
                              <button
                                className="btn-icon"
                                onClick={() => handleDeleteTask(task.id)}
                                title="Delete task"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            
                            {task.description && (
                              <p className="task-description">{task.description}</p>
                            )}

                            <div className="task-meta">
                              <select
                                value={task.priority}
                                onChange={(e) => handleUpdateTask(task.id, { priority: e.target.value })}
                                className={`priority-badge priority-${task.priority}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {PRIORITIES.map(p => (
                                  <option key={p} value={p}>{p.toUpperCase()}</option>
                                ))}
                              </select>

                              <select
                                value={task.category}
                                onChange={(e) => handleUpdateTask(task.id, { category: e.target.value })}
                                className={`category-badge category-${task.category}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {CATEGORIES.map(c => (
                                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                ))}
                              </select>
                            </div>

                            {task.attachments && task.attachments.length > 0 && (
                              <div className="attachments">
                                {task.attachments.map((attachment, idx) => (
                                  <div key={idx} className="attachment-item">
                                    {attachment.type.startsWith('image/') ? (
                                      <img src={attachment.url} alt={attachment.name} className="attachment-preview" />
                                    ) : (
                                      <span className="attachment-name">📎 {attachment.name}</span>
                                    )}
                                    <button
                                      className="btn-icon-small"
                                      onClick={() => removeAttachment(task.id, idx)}
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="task-actions">
                              <label className="upload-btn">
                                <Upload size={16} />
                                <span>Attach file</span>
                                <input
                                  type="file"
                                  onChange={(e) => handleFileUpload(task.id, e)}
                                  style={{ display: 'none' }}
                                  accept="image/*,.pdf,.doc,.docx"
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
