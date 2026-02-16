# 🧪 Testing Guide

Comprehensive guide for running and writing tests for the Kanban board application.

## Test Structure

```
frontend/src/tests/
├── unit/                    # Unit tests
│   └── taskOperations.test.js
├── integration/             # Integration tests
│   └── KanbanBoard.test.jsx
├── e2e/                     # End-to-end tests
│   └── kanban.spec.js
└── setup.js                 # Test configuration
```

## Running Tests

### All Unit & Integration Tests
```bash
cd frontend
npm test
```

### Watch Mode (Re-run on changes)
```bash
npm test -- --watch
```

### Specific Test File
```bash
npm test -- taskOperations.test.js
```

### With Coverage Report
```bash
npm run test:coverage
```

### Interactive UI
```bash
npm run test:ui
```

## E2E Tests with Playwright

### Prerequisites
Ensure both servers are running:
```bash
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm run dev
```

### Run E2E Tests
```bash
cd frontend
npm run test:e2e
```

### Run Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Interactive Mode
```bash
npm run test:e2e:ui
```

### Debug Mode
```bash
npx playwright test --debug
```

## Writing Tests

### Unit Tests (Vitest)

Example test structure:
```javascript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = functionToTest(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

### Integration Tests (React Testing Library)

Example component test:
```javascript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component Name', () => {
  it('should render correctly', async () => {
    render(<Component />);
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<Component />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(screen.getByText('Result')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

Example E2E test:
```javascript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete user workflow', async ({ page }) => {
    // Navigate and interact
    await page.click('text=Button');
    await page.fill('input[name="field"]', 'value');
    
    // Assert results
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

## Test Coverage Goals

Aim for the following coverage:

- **Unit Tests**: 80%+ code coverage
- **Integration Tests**: Cover all major user flows
- **E2E Tests**: Cover critical user journeys

## Common Testing Patterns

### Testing Async Operations
```javascript
it('should handle async data', async () => {
  render(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument();
  });
});
```

### Testing WebSocket Events
```javascript
it('should handle WebSocket events', () => {
  const mockSocket = {
    on: vi.fn(),
    emit: vi.fn(),
  };
  
  // Test socket interactions
});
```

### Testing Drag and Drop
```javascript
test('should drag and drop task', async ({ page }) => {
  const task = page.locator('.task-card').first();
  const column = page.locator('.kanban-column').last();
  
  await task.dragTo(column);
  
  await expect(task).toBeVisible();
});
```

### Testing File Upload
```javascript
test('should upload file', async ({ page }) => {
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('path/to/test-file.png');
  
  await expect(page.locator('.attachment-preview')).toBeVisible();
});
```

## Debugging Tests

### Vitest Debugging
```bash
# Run with debug output
npm test -- --reporter=verbose

# Run specific test
npm test -- -t "test name"
```

### Playwright Debugging
```bash
# Debug mode with step-by-step execution
npx playwright test --debug

# Generate trace for failed tests
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip
```

### Browser DevTools
```bash
# Run with headed browser
npx playwright test --headed

# Run with slow motion
npx playwright test --slow-mo=1000
```

## Continuous Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

## Best Practices

1. **Test Naming**: Use descriptive names that explain what's being tested
2. **Isolation**: Each test should be independent
3. **Cleanup**: Clean up after tests (remove test data, reset state)
4. **Mocking**: Mock external dependencies (WebSocket, APIs)
5. **Assertions**: Use specific, meaningful assertions
6. **Coverage**: Aim for high coverage but prioritize meaningful tests
7. **Performance**: Keep tests fast and efficient

## Common Issues

### Tests Timing Out
- Increase timeout: `test.setTimeout(30000)`
- Check for unresolved promises
- Ensure cleanup in afterEach

### Flaky Tests
- Add proper waits: `await waitFor()`
- Check for race conditions
- Ensure test isolation

### WebSocket Connection Issues
- Mock socket connections in unit tests
- Ensure backend is running for E2E tests
- Check CORS configuration

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
