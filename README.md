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
test-data/    users, checkout details, product names
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

## Iterations
- [x] Iteration 1: page objects, helpers and 24 tests (22 scenarios) tagged `@smoke` / `@regression`
- [ ] Iteration 2: data-driven tests and GitHub Actions
