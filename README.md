# Knowt E2E Playwright Automation

Comprehensive end-to-end testing suite for Knowt using Playwright. This project includes automated tests for authentication, card creation, learning workflows, and practice modules.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Page Objects](#page-objects)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- Page Object Model for maintainable tests
- Comprehensive test fixtures and utilities
- Test data management
- Multiple browsers support
- Detailed logging and error tracking
- Organized test categories (auth, create-cards, learning, practice)

## 🔧 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd knowt-e2e-playwright-automation
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

## 📁 Project Structure

```
knowt-e2e-playwright-automation/
│
├── tests/
│   ├── auth/
│   ├── create-cards/
│   ├── learning/
│   └── practice/
│
├── pages/
│   ├── landing.page.ts
│   ├── login.page.ts
│   ├── dashboard.page.ts
│   ├── library.page.ts
│   ├── deck.page.ts
│   ├── study.page.ts
│   └── practice.page.ts
│
├── fixtures/
│   └── test-base.ts
│
├── utils/
│   └── browser-utils.ts
│
├── test-data/
│   ├── cards1.json
│   └── cards2.json
│
├── constants/
│   ├── label-title.ts
│   ├── message.ts
│   └── config.ts
│
├── models/
│   ├── deck.ts
│   └── question.ts
│
├── enums/
│   └── question-types.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

## ⚙️ Configuration

See [SETUP.md](SETUP.md) for detailed configuration instructions.

Key configuration file: `playwright.config.ts`

## 🚀 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with UI mode
```bash
npm test -- --ui
```

### Run tests in headed mode
```bash
npm test -- --headed
```

### Run specific test file
```bash
npm test tests/auth/login.spec.ts
```

## ✍️ Writing Tests

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on writing tests.



## 📄 Page Objects

All page objects are located in the `pages/` directory:

- **LoginPage** (`login.page.ts`) - Login functionality
- **DashboardPage** (`dashboard.page.ts`) - Main dashboard
- **LibraryPage** (`library.page.ts`) - Card library
- **DeckPage** (`deck.page.ts`) - Deck management
- **StudyPage** (`study.page.ts`) - Study mode
- **PracticePage** (`practice.page.ts`) - Practice mode


### Element not found
- Use `--debug` flag to inspect elements
- Check selector validity
- Verify element is visible/enabled

For more help, see [CONTRIBUTING.md](CONTRIBUTING.md#troubleshooting).


## 📋 Table of Contents
Tool used:
Visual Studio Code with the following extensions:
- Playwright Test for VSCode to run and debug tests directly from the editor
- Github Copilot Chat to generate content based on project structure and files
- Markdown All in One for formatting markdown files
- Prettier for code formatting
- ESLint for code linting





# Setup Guide

This guide provides detailed instructions for setting up the Knowt E2E Playwright Automation project.

## Prerequisites

- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Git**: For cloning the repository ([Download](https://git-scm.com/))

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd knowt-e2e-playwright-automation
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
