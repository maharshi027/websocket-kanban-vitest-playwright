import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KanbanBoard from '../../components/KanbanBoard';

// Mock socket.io-client
vi.mock('socket.io-client', () => {
  const mockSocket = {
    on: vi.fn(),
    emit: vi.fn(),
    close: vi.fn(),
  };
  
  return {
    default: vi.fn(() => mockSocket),
  };
});

describe('KanbanBoard Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the Kanban board with three columns', async () => {
    render(<KanbanBoard />);
    
    await waitFor(() => {
      expect(screen.getByText('To Do')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });
  });

  it('should display connection status', async () => {
    render(<KanbanBoard />);
    
    await waitFor(() => {
      const statusElement = screen.getByText(/Connected|Disconnected/);
      expect(statusElement).toBeInTheDocument();
    });
  });

  it('should show add task button', async () => {
    render(<KanbanBoard />);
    
    await waitFor(() => {
      const addButton = screen.getByText(/Add Task/);
      expect(addButton).toBeInTheDocument();
    });
  });

  it('should display task progress chart', async () => {
    render(<KanbanBoard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Task Progress/)).toBeInTheDocument();
    });
  });

  it('should open add task modal when button is clicked', async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Add Task/)).toBeInTheDocument();
    });

    const addButton = screen.getByText(/Add Task/);
    await user.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('Add New Task')).toBeInTheDocument();
    });
  });

  it('should close modal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Add Task/)).toBeInTheDocument();
    });

    // Open modal
    const addButton = screen.getByText(/Add Task/);
    await user.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('Add New Task')).toBeInTheDocument();
    });

    // Close modal
    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Add New Task')).not.toBeInTheDocument();
    });
  });

  it('should render task count badges', async () => {
    render(<KanbanBoard />);
    
    await waitFor(() => {
      const countBadges = screen.getAllByText(/\d+/);
      expect(countBadges.length).toBeGreaterThan(0);
    });
  });
});

describe('Task Form Validation', () => {
  it('should have all required form fields in add task modal', async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Add Task/)).toBeInTheDocument();
    });

    const addButton = screen.getByText(/Add Task/);
    await user.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Task description')).toBeInTheDocument();
    });
  });

  it('should have priority and category dropdowns', async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Add Task/)).toBeInTheDocument();
    });

    const addButton = screen.getByText(/Add Task/);
    await user.click(addButton);
    
    await waitFor(() => {
      const labels = screen.getAllByText(/Priority|Category|Column/i);
      expect(labels.length).toBeGreaterThan(0);
    });
  });
});
