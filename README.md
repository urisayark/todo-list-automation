# Todo List Automation Testing

Automated UI testing for the [React TodoMVC demo](https://demo.playwright.dev/todomvc/) using Playwright and TypeScript.

The project follows the Page Object Model (POM) to improve code reusability and maintainability.

## Tech Stack

- Playwright
- TypeScript
- Node.js and npm

## Project Structure

```text
todo-list-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   └── TodoPage.ts
├── tests/
│   └── todo.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

- `TodoPage.ts`: Page locators and reusable actions.
- `todo.spec.ts`: Automated test cases and assertions.
- `playwright.config.ts`: Browser and test configuration.
- `.github/workflows/playwright.yml`: GitHub Actions workflow for automated test execution.

## Test Cases

| ID | Test Scenario |
|---|---|
| TC01 | Add a new todo |
| TC02 | Add multiple todos |
| TC03 | Complete a todo |
| TC04 | Uncomplete a todo |
| TC05 | Delete a todo |
| TC06 | Edit an existing todo |
| TC07 | Prevent adding an empty todo |
| TC08 | Filter active todos |
| TC09 | Filter completed todos |
| TC10 | Clear completed todos |
| TC11 | Verify todo persistence after refresh |
| TC12 | Return to All filter |

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- Git

Verify installation:

```bash
node -v
npm -v
git --version
```

## Setup

Clone the repository:

```bash
git clone https://github.com/urisayark/todo-list-automation.git
cd todo-list-automation
```

Install dependencies:

```bash
npm ci
```

Install Chromium:

```bash
npx playwright install chromium
```

## Run Tests

Run all test cases:

```bash
npx playwright test
```

Run a specific test case:

```bash
npx playwright test --grep "TC01"
```

Run tests with a visible browser:

```bash
npx playwright test --headed
```

View the HTML report:

```bash
npx playwright show-report
```

## Design Approach

The Page Object Model separates page interactions from test scenarios. Reusable methods are maintained in `TodoPage.ts`, while test scenarios and assertions are defined in `todo.spec.ts`.

## Test Results

All 12 automated test cases passed in Chromium in the latest local test run.
