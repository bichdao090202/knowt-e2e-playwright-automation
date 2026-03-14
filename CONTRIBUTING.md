# Contributing Guide

Thank you for your interest in contributing to the StudyKid E2E Playwright Automation project! This guide will help you understand our development process and standards.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Writing Tests](#writing-tests)
- [Page Objects](#page-objects)
- [Code Style](#code-style)
- [Best Practices](#best-practices)
- [Debugging Tests](#debugging-tests)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Report issues professionally
- Follow project guidelines

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Make your changes
6. Test your changes: `npm test`
7. Commit and push to your fork
8. Create a Pull Request

## Development Workflow

### Branch Naming Convention

```
feature/description      - For new features
bugfix/description      - For bug fixes
refactor/description    - For refactoring
docs/description        - For documentation updates
```

Example: `feature/add-login-validation-tests`

### Commit Messages

Write clear, descriptive commit messages:

```
✨ Add new login validation tests

- Added test for invalid email format
- Added test for empty password field
- Updated LoginPage with new selectors
```

### Pull Request Process

1. Update your fork to latest main branch
2. Create a descriptive PR title
3. Include description of changes
4. Reference related issues (if any)
5. Ensure all tests pass
6. Request review from maintainers

## Writing Tests

### Test Structure

Follow this pattern for organizing tests:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('User can login with valid credentials', async () => {
    await loginPage.login('test@example.com', 'password123');
    expect(loginPage.page.url()).toContain('/dashboard');
  });

  test('User sees error with invalid credentials', async () => {
    await loginPage.login('test@example.com', 'wrongpassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });
});
```

### Test Naming

Test names should be:
- Descriptive: `test('User can create a new flashcard deck')`
- Action-oriented: Start with action verb
- Clear intent: Avoid vague names like "test basic flow"

### Test Categories

Organize tests by feature:

```
tests/
├── auth/           - Authentication tests
├── create-cards/   - Card creation tests
├── learning/       - Learning mode tests
└── practice/       - Practice mode tests
```

### Using Test Fixtures

Create reusable test setup with fixtures:

```typescript
import { test as base } from '@playwright/test';
import { TestBase } from '../fixtures/test-base';

export const test = base.extend<TestBase>({
  testBase: async ({ page }, use) => {
    const testBase = new TestBase(page);
    await testBase.setup();
    yield testBase;
    await testBase.cleanup();
  },
});
```

## Page Objects

### Creating a Page Object

Page objects encapsulate page interactions:

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('button:has-text("Sign In")');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.locator('.error-message').textContent() || '';
  }
}
```

### Page Object Best Practices

- One page object per page/component
- Use meaningful method names that describe actions
- Keep selectors private/encapsulated
- Use locators instead of hardcoded selectors
- Add wait utilities for dynamic content

## Code Style

### TypeScript

- Use strict typing
- Avoid `any` type
- Use proper interfaces and types
- Follow PascalCase for classes, camelCase for variables

### Naming Conventions

```typescript
// Classes: PascalCase
class LoginPage { }

// Methods/Functions: camelCase
async loginUser() { }

// Constants: UPPER_SNAKE_CASE
const MAX_WAIT_TIME = 30000;

// Private members: prefix with underscore
private _internalState = {};
```

### Formatting

- Use Prettier for code formatting
- Run `npm run format` before committing
- Lines should not exceed 100 characters

## Best Practices

### Waits and Timeouts

```typescript
// ✅ Good: Use Playwright's built-in waits
await page.waitForTimeout(1000); // Only for artificial delays
await page.waitForLoadState('networkidle');
await page.locator('button').waitFor({ state: 'visible' });

// ❌ Avoid: Hard-coded arbitrary waits
await new Promise(resolve => setTimeout(resolve, 5000));
```

### Selectors

```typescript
// ✅ Good: Use semantic selectors
page.locator('button:has-text("Login")');
page.locator('input[type="email"]');

// ❌ Avoid: Using brittle CSS or XPath
page.locator('div:nth-child(3) > button');
```

### Assertions

```typescript
// ✅ Good: Clear and descriptive
expect(page).toHaveURL('http://example.com/dashboard');
expect(loginButton).toBeVisible();

// ❌ Avoid: Vague assertions
expect(page.url()).not.toEqual('');
```

## Debugging Tests

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

This opens the Playwright Inspector where you can:
- Step through tests
- Inspect elements
- Run commands in the console

### UI Mode

```bash
npm test -- --ui
```

Visual interface for running and debugging tests.

### Use Page Object Debugging

```typescript
// Add logs to page objects
async login(email: string, password: string) {
  console.log(`Logging in with email: ${email}`);
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.submitButton.click();
  console.log('Login button clicked');
}
```

### Screenshots and Videos

Enable in `playwright.config.ts`:

```typescript
export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

## Submitting Changes

### Before Submitting

1. Ensure all tests pass: `npm test`
2. Format code: `npm run format` (if available)
3. Review your changes thoroughly
4. Test on multiple browsers if possible

### Pull Request Checklist

- [ ] All tests pass
- [ ] Code follows project style
- [ ] Commit messages are clear
- [ ] Changes are focused and minimal
- [ ] Documentation is updated (if needed)
- [ ] No console errors or warnings

### Common Issues and Solutions

#### Tests timing out
- Check application is running
- Verify selectors are correct
- Increase timeout: `test.setTimeout(60000)`

#### Tests are flaky
- Avoid hard-coded waits
- Use Playwright's wait utilities
- Check for race conditions
- Review page object logic

#### Can't find elements
- Use `--debug` flag to inspect
- Verify selector in browser DevTools
- Check element is in viewport
- Ensure page has fully loaded

## Getting Help

- 📖 [Playwright Documentation](https://playwright.dev)
- 🐛 [Report Issues](../../issues)
- 💬 [Discussions](../../discussions)
- 👨‍💻 Contact the maintainers

---

Thank you for contributing! 🎉
