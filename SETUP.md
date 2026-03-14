# Setup Guide

This guide provides detailed instructions for setting up the StudyKid E2E Playwright Automation project.

## Prerequisites

- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Git**: For cloning the repository ([Download](https://git-scm.com/))

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd studykid-e2e-playwright-automation
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- `@playwright/test` - Playwright testing framework
- All other project dependencies listed in `package.json`

### 3. Install Browsers

```bash
npx playwright install
```

This installs Chromium, Firefox, and WebKit browsers used by Playwright.

### 4. Verify Installation

Run a quick test to verify everything is working:

```bash
npm test -- --headed --workers=1
```

## Configuration

### Base URL Configuration

Edit `playwright.config.ts` and set your base URL:

```typescript
export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000', // Change this to your app URL
  },
});
```

### API Endpoints

Update `constants/config.ts` with your environment-specific settings:

```typescript
export const CONFIG = {
  baseUrl: 'http://localhost:3000',
  apiUrl: 'http://localhost:3000/api',
  timeout: 30000,
};
```

### Test Data

Test data files are located in `test-data/`:
- `cards1.json` - Sample card data
- `cards2.json` - Additional card data

Customize these files for your test scenarios.

## Environment Setup

### Development Environment

1. Ensure the StudyKid application is running and accessible
2. Configure the base URL in Playwright config
3. Optionally set environment variables:

```bash
# Windows PowerShell
$env:BASE_URL = "http://localhost:3000"
$env:API_URL = "http://localhost:3000/api"

# Linux/macOS
export BASE_URL=http://localhost:3000
export API_URL=http://localhost:3000/api
```

### CI/CD Environment

For GitHub Actions or other CI systems, ensure:
1. Node.js is available
2. Dependencies are installed via `npm install`
3. Browsers are installed via `npx playwright install`
4. Base URL is set for the deployment environment

## Troubleshooting Setup Issues

### Issue: `playwright is not recognized`

**Solution**: Ensure you've run `npm install` and that `node_modules/.bin` is in your PATH.

```bash
npm install
npx playwright --version
```

### Issue: Browsers fail to install

**Solution**: Try installing with additional flags:

```bash
npx playwright install --with-deps
```

### Issue: Tests cannot find elements

**Solution**: 
1. Verify the base URL is correct in `playwright.config.ts`
2. Ensure the application is running
3. Check that the correct browser is being used

### Issue: Port already in use

**Solution**: If the default ports are in use, change them in your configuration:

```typescript
export default defineConfig({
  use: {
    baseURL: 'http://localhost:3001', // Change port
  },
});
```

## Next Steps

1. Read the main [README.md](README.md)
2. Check [CONTRIBUTING.md](CONTRIBUTING.md) for test development guidelines
3. Review page objects in the `pages/` directory
4. Run your first test: `npm test`

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting-setup-issues) section
2. Review Playwright documentation
3. Check the project's issue tracker
4. Contact the development team
