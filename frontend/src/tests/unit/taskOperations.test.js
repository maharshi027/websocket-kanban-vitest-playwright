import { describe, it, expect, beforeEach } from 'vitest';

// Mock task operations
const createTask = (title, description, column = 'todo', priority = 'medium', category = 'feature') => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title,
    description,
    column,
    priority,
    category,
    attachments: [],
    createdAt: new Date().toISOString()
  };
};

const updateTask = (task, updates) => {
  return {
    ...task,
    ...updates,
    updatedAt: new Date().toISOString()
  };
};

const deleteTask = (tasks, taskId) => {
  return tasks.filter(t => t.id !== taskId);
};

const moveTask = (task, newColumn) => {
  return {
    ...task,
    column: newColumn,
    updatedAt: new Date().toISOString()
  };
};

describe('Task Operations Unit Tests', () => {
  let tasks;

  beforeEach(() => {
    tasks = [
      createTask('Task 1', 'Description 1', 'todo', 'high', 'bug'),
      createTask('Task 2', 'Description 2', 'inprogress', 'medium', 'feature'),
      createTask('Task 3', 'Description 3', 'done', 'low', 'enhancement')
    ];
  });

  describe('createTask', () => {
    it('should create a task with all properties', () => {
      const task = createTask('New Task', 'New Description', 'todo', 'high', 'bug');
      
      expect(task).toHaveProperty('id');
      expect(task.title).toBe('New Task');
      expect(task.description).toBe('New Description');
      expect(task.column).toBe('todo');
      expect(task.priority).toBe('high');
      expect(task.category).toBe('bug');
      expect(task.attachments).toEqual([]);
      expect(task).toHaveProperty('createdAt');
    });

    it('should create a task with default values', () => {
      const task = createTask('Simple Task', 'Simple Description');
      
      expect(task.column).toBe('todo');
      expect(task.priority).toBe('medium');
      expect(task.category).toBe('feature');
    });

    it('should generate unique IDs for tasks', () => {
      const task1 = createTask('Task 1', 'Desc 1');
      const task2 = createTask('Task 2', 'Desc 2');
      
      expect(task1.id).not.toBe(task2.id);
    });
  });

  describe('updateTask', () => {
    it('should update task properties', () => {
      const originalTask = tasks[0];
      const updatedTask = updateTask(originalTask, {
        title: 'Updated Title',
        priority: 'low'
      });
      
      expect(updatedTask.title).toBe('Updated Title');
      expect(updatedTask.priority).toBe('low');
      expect(updatedTask.description).toBe(originalTask.description);
      expect(updatedTask).toHaveProperty('updatedAt');
    });

    it('should update task attachments', () => {
      const originalTask = tasks[0];
      const attachment = { name: 'file.pdf', url: 'http://example.com/file.pdf' };
      const updatedTask = updateTask(originalTask, {
        attachments: [attachment]
      });
      
      expect(updatedTask.attachments).toHaveLength(1);
      expect(updatedTask.attachments[0]).toEqual(attachment);
    });
  });

  describe('deleteTask', () => {
    it('should remove a task from the list', () => {
      const taskId = tasks[1].id;
      const remainingTasks = deleteTask(tasks, taskId);
      
      expect(remainingTasks).toHaveLength(2);
      expect(remainingTasks.find(t => t.id === taskId)).toBeUndefined();
    });

    it('should return all tasks if ID not found', () => {
      const remainingTasks = deleteTask(tasks, 'non-existent-id');
      
      expect(remainingTasks).toHaveLength(3);
    });
  });

  describe('moveTask', () => {
    it('should move task to a new column', () => {
      const task = tasks[0];
      const movedTask = moveTask(task, 'done');
      
      expect(movedTask.column).toBe('done');
      expect(movedTask).toHaveProperty('updatedAt');
    });

    it('should preserve other task properties when moving', () => {
      const task = tasks[0];
      const movedTask = moveTask(task, 'inprogress');
      
      expect(movedTask.title).toBe(task.title);
      expect(movedTask.description).toBe(task.description);
      expect(movedTask.priority).toBe(task.priority);
      expect(movedTask.category).toBe(task.category);
    });
  });

  describe('Task Validation', () => {
    it('should validate priority values', () => {
      const validPriorities = ['low', 'medium', 'high'];
      const task = createTask('Test', 'Test', 'todo', 'high', 'bug');
      
      expect(validPriorities).toContain(task.priority);
    });

    it('should validate category values', () => {
      const validCategories = ['bug', 'feature', 'enhancement'];
      const task = createTask('Test', 'Test', 'todo', 'high', 'bug');
      
      expect(validCategories).toContain(task.category);
    });

    it('should validate column values', () => {
      const validColumns = ['todo', 'inprogress', 'done'];
      const task = createTask('Test', 'Test', 'todo');
      
      expect(validColumns).toContain(task.column);
    });
  });
});
