import { test, expect } from '@playwright/test';

test.describe('Kanban Board E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('.kanban-board', { timeout: 10000 });
  });

  test('should display the Kanban board with all columns', async ({ page }) => {
    await expect(page.locator('text=To Do')).toBeVisible();
    await expect(page.locator('text=In Progress')).toBeVisible();
    await expect(page.locator('text=Done')).toBeVisible();
  });

  test('should show connection status', async ({ page }) => {
    const statusIndicator = page.locator('.status-indicator');
    await expect(statusIndicator).toBeVisible();
    
    const statusText = await statusIndicator.textContent();
    expect(statusText).toMatch(/(Connected|Disconnected)/);
  });

  test('should display task progress chart', async ({ page }) => {
    await expect(page.locator('text=Task Progress')).toBeVisible();
    await expect(page.locator('.progress-chart-container')).toBeVisible();
  });

  test('should open add task modal when clicking Add Task button', async ({ page }) => {
    await page.click('text=Add Task');
    await expect(page.locator('text=Add New Task')).toBeVisible();
    await expect(page.locator('input[placeholder="Task title"]')).toBeVisible();
  });

  test('should create a new task', async ({ page }) => {
   
    await page.click('text=Add Task');
    
 
    await page.fill('input[placeholder="Task title"]', 'E2E Test Task');
    await page.fill('textarea[placeholder="Task description"]', 'This is a test task created by Playwright');
    

    await page.click('button:has-text("Add Task"):not(:has-text("Add Task "))');
    

    await expect(page.locator('text=E2E Test Task')).toBeVisible({ timeout: 5000 });
  });

  test('should close modal when clicking Cancel', async ({ page }) => {
    await page.click('text=Add Task');
    await expect(page.locator('text=Add New Task')).toBeVisible();
    
    await page.click('text=Cancel');
    await expect(page.locator('text=Add New Task')).not.toBeVisible();
  });

  test('should display task count badges', async ({ page }) => {
    const countBadges = page.locator('.task-count');
    const count = await countBadges.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should display sample tasks', async ({ page }) => {

    await page.waitForSelector('.task-card', { timeout: 5000 });
    
    const taskCards = page.locator('.task-card');
    const count = await taskCards.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Task Management E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.kanban-board', { timeout: 10000 });
  });

  test('should delete a task', async ({ page }) => {

    await page.waitForSelector('.task-card', { timeout: 5000 });
    
  
    const initialCount = await page.locator('.task-card').count();
  
    const deleteButton = page.locator('.btn-icon').first();
    await deleteButton.click();
    
   
    await page.waitForTimeout(500);
    
  
    const newCount = await page.locator('.task-card').count();
    expect(newCount).toBe(initialCount - 1);
  });

  test('should change task priority', async ({ page }) => {
    await page.waitForSelector('.task-card', { timeout: 5000 });
    
    const prioritySelect = page.locator('.priority-badge').first();
    await prioritySelect.click();
    
 
    await prioritySelect.selectOption('high');
    

    await expect(prioritySelect).toHaveValue('high');
  });

  test('should change task category', async ({ page }) => {
    await page.waitForSelector('.task-card', { timeout: 5000 });
    
    const categorySelect = page.locator('.category-badge').first();
    await categorySelect.click();
    
    await categorySelect.selectOption('bug');
 
    await expect(categorySelect).toHaveValue('bug');
  });
});

test.describe('File Upload E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.kanban-board', { timeout: 10000 });
    await page.waitForSelector('.task-card', { timeout: 5000 });
  });

  test('should display file upload button', async ({ page }) => {
    const uploadButton = page.locator('.upload-btn').first();
    await expect(uploadButton).toBeVisible();
  });

  test('should have file input for attachments', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await expect(fileInput).toBeAttached();
  });
});

test.describe('Chart Visualization E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.kanban-board', { timeout: 10000 });
  });

  test('should display task statistics', async ({ page }) => {
    await expect(page.locator('text=Total Tasks:')).toBeVisible();
    await expect(page.locator('text=Completion:')).toBeVisible();
  });

  test('should display charts', async ({ page }) => {
    await expect(page.locator('text=Tasks by Status')).toBeVisible();
    await expect(page.locator('text=Task Distribution')).toBeVisible();
  });

  test('should show chart containers', async ({ page }) => {
    const chartWrappers = page.locator('.chart-wrapper');
    const count = await chartWrappers.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});

test.describe('Responsive Design E2E Tests', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.waitForSelector('.kanban-board', { timeout: 10000 });
    await expect(page.locator('.kanban-header')).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await page.waitForSelector('.kanban-board', { timeout: 10000 });
    await expect(page.locator('.kanban-board')).toBeVisible();
  });
});
