# Playwright Test Suite

This test suite is built using Playwright with TypeScript, aimed at automating end-to-end (E2E) scenarios for a modern web application Automation Exercise (https://www.automationexercise.com/). The goal is to ensure that critical user flows like registration, login, session management, and logout work reliably under various conditions.

## 📦 Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

## 🚀 Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tc1-register-user.test.ts
```

View the HTML test report:

```bash
npx playwright show-report
```

## 🛠 Project Structure

```
project-root/
├── pages                                                  # Page Object Model (POM) classes
│   ├── LogInPage.ts                                         # Page class for login
│   ├── RegisterPage.ts                                      # Page class for registration
├── utils                                                  # Utility/helper functions
│   ├── common-setup.ts                                      # Shared functions: delete account, add product, check cart
├── tests                                                  # Included script to run testcases
│   ├── tc1-register-user.test.ts                            # Test for user registration
│   ├── tc2-login-success.test.ts                            # Test for successful login
│   ├── tc3-login-unsuccess.test.ts                          # Test for unsuccessful login attempt
│   ├── tc4-logout.test.ts                                   # Test for logout functionality
│   ├── tc5-register-existing-email.test.ts                  # Test registering with an existing email
│   ├── tc6-products-persisted-new-tab.test.ts               # Check product persistence in new tab
│   ├── tc7-products-persisted-login-new-browser.test.ts     # Check session persistence in new browser
├── playwright.config.ts                                   # Playwright configuration file
├── README.md                                              # Documentation for setup and usage
├── package.json                                           # Node.js project manifest (scripts, dependencies)
└── test-results/                                          # Output folder for test reports, screenshots, and traces
```

## 🧹 Cleaning Up

To remove stored reports, videos, or screenshots:

```bash
rm -rf test-results playwright-report
```
