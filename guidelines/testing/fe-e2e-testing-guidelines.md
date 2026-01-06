# FE E2E Testing Guidelines

- Use Playwright
- Use Page Object Model (POM) pattern for organizing test code
- npm run test:e2e:ui should run the tests

## Folder Structure

Example:

- front-end
  - lib
    - auth-helper - Helper function to login/logout users for tests
    - base-page - Base page object with common methods used by page objects
    - test-helpers - Shared test utilities, such as clearing storage
  - component-objects - Contains a wrapper for reusable components
    - data-table
  - page-objects
    - user-page
    - organizations-page
  - tests
    - auth
      - login.spec.ts
      - logout.spec.ts
    - dashboard
      - dashboard.spec.ts
    - integration

### Tests Folder

The /testing/front-end/tests folder should be organized by routes and mirror the /src/app structure as much as possible.

For example, wherever there is page.tsx under /src/app, there should be an equivalent .spec.ts file under /testing/front-end/tests. The folder structure should reflect the route structure.

There should only be one file for a route and all tests for that route should be in that file.

## Security

- Use auth-helper to login/logout users in tests
- Tests should cover both authenticated and unauthenticated scenarios
