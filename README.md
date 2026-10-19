# SauceDemo-MyShopify

Automated UI tests for [SauceDemo](https://www.saucedemo.com), a practice shopping site.
Built as a learning project, covering login, products, cart and checkout.

## Tech stack

- Playwright Test
- TypeScript
- Chromium only
- Page Object Model

## Folder structure

```
pages/        page objects (Login, Inventory, Cart, Checkout)
helpers/      shared steps (login, add products, go to checkout)
test-data/    users, checkout details, product names, data-driven cases
tests/        login, inventory, cart and checkout specs
```

## How to run

```
npm ci
npx playwright install chromium
npx playwright test
```

Other useful commands:

```
npx playwright test --ui
npx playwright test --grep @smoke
npx playwright show-report
```

## CI

GitHub Actions runs the tests on every push and pull request to `main`, and can also be started by hand
(Actions tab, Run workflow). The HTML report is uploaded as the `playwright-report` artifact.
The workflow is in `.github/workflows/playwright.yml`.

## Iterations

- [x] Iteration 1: page objects, helpers and tests tagged `@smoke` / `@regression`
- [x] Iteration 2: data-driven tests (login, sorting, checkout form) and GitHub Actions
